import { BigNumber, ContractReceipt, ContractTransaction, Signer } from "ethers";
import { BundleInfo } from "./bundle_info";
import { TransactionFailedError } from "../utils/error";
import moment from "moment";
import { formatBytes32String, formatEther } from "ethers/lib/utils";
import { IChainRegistry, IChainRegistry__factory, IERC20Metadata__factory, IStaking, IStaking__factory } from "../contracts/registry-contracts";

/** get from https://github.com/etherisc/registry-contracts/blob/develop/contracts/registry/ChainRegistryV01.sol#L27 */
const OBJECT_TYPE_UNDEFINED = 0;
const OBJECT_TYPE_PROTOCOL = 1;
const OBJECT_TYPE_CHAIN = 2;
const OBJECT_TYPE_REGISTRY = 3;
const OBJECT_TYPE_TOKEN = 4;
const OBJECT_TYPE_STAKE = 10;
const OBJECT_TYPE_INSTANCE = 20;
const OBJECT_TYPE_PRODUCT = 21;
const OBJECT_TYPE_ORACLE = 22;
const OBJECT_TYPE_RISKPOOL = 23;
const OBJECT_TYPE_POLICY = 30;
const OBJECT_TYPE_BUNDLE = 40;


export default class StakingContract {
    private signer: Signer;
    private staking: IStaking;
    private chainRegistry?: IChainRegistry;
    private knownTokens: Map<string, [string, number]> = new Map();
    private chainId: number = 0;
    private chainIdB32: string = "";
    
    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        this.staking = IStaking__factory.connect(stakingContractAddress, signer);
    }

    async initialize(): Promise<void> {
        const registryAddress = await this.staking.getRegistry();
        this.chainRegistry = IChainRegistry__factory.connect(registryAddress, this.signer);
        this.chainId = await this.signer.getChainId();
        this.chainIdB32 = formatBytes32String(await this.chainRegistry.toChain(this.chainId));
    }

    async getAllInstanceInfos() {
        const instanceInfos = [];
        const numInstances = await this.chainRegistry!.objects(this.chainIdB32, OBJECT_TYPE_INSTANCE);
        // console.log("numInstances", numInstances);
        // loop over instances and get instance id
        for (let i = 0; i < numInstances.toNumber(); i++) {
            const nftId = await this.chainRegistry!["getNftId(bytes5,uint8,uint256)"](this.chainIdB32, OBJECT_TYPE_INSTANCE, i);
            const { instanceId, registry, displayName } = await this.chainRegistry!.decodeInstanceData(nftId);
            instanceInfos.push({ instanceId , displayName, chainId: this.chainId!, registry, nftId});
        }
        return instanceInfos;
    }

    async getToken(tokenAddress: string): Promise<[string, number]> {
        if (this.knownTokens.has(tokenAddress)) {
            return this.knownTokens.get(tokenAddress)!;
        }
        const token = IERC20Metadata__factory.connect(tokenAddress, this.signer);
        const [name, decimals] = await Promise.all([token.symbol(), token.decimals()]);
        this.knownTokens.set(tokenAddress, [name, decimals]);
        return [name, decimals];
    }

    async getBundleNftIds(): Promise<Array<BigNumber>> {
        const bundlesNftIds = [];
        // console.log("instance", instanceId);
        const numBundles = await this.chainRegistry!.objects(this.chainIdB32, OBJECT_TYPE_BUNDLE);
        for (let idx = 0; idx < numBundles.toNumber(); idx++) {
            const nftId = await this.chainRegistry!["getNftId(bytes5,uint8,uint256)"](this.chainIdB32, OBJECT_TYPE_BUNDLE, idx);
            bundlesNftIds.push(nftId);
        }
        return bundlesNftIds;
    }

    async getBundleInfo(bundleNftId: BigNumber, instanceId: string, instanceName: string, chainId: number, myWallet: string | undefined, registry: string): Promise<BundleInfo> {
        const { token } = await this.chainRegistry!.decodeBundleData(bundleNftId);
        const { riskpoolId, bundleId, displayName, bundleState, expiryAt } = await this.staking!.getBundleInfo(bundleNftId);

        const stakedAmount = await this.staking!.stakes(bundleNftId);
        let myStakedAmount = BigNumber.from(0);
        const supportedAmount = await this.calculateSupportedAmount(stakedAmount, token);
        let mySupportingAmount = BigNumber.from(0);

        // TODO fix this later - loop over all nfts and sum up the stakes belonging to the same bundle
        // if (myWallet !== undefined) {
        //     myStakedAmount = await this.staking!.stakes(bundleNftId);
        //     mySupportingAmount = await this.calculateSupportedAmount(myStakedAmount, chainId, token);
        // }

        const [tokenSymbol, tokenDecimals] = await this.getToken(token);

        const stakingSupported = await this.staking!.isStakingSupported(bundleNftId);
        const unstakingSupported = await this.staking!.isUnstakingSupported(bundleNftId);

        return {
            id: `${instanceId}-${bundleId}`,
            chainId: chainId,
            instanceId: instanceId,
            instanceName: instanceName,
            registry: registry,
            riskpoolId: riskpoolId.toNumber(),
            bundleId: bundleId.toNumber(),
            bundleName: displayName,
            nftId: bundleNftId.toString(),
            token: token,
            myStakedAmount: myStakedAmount.toString(),
            stakedAmount: stakedAmount.toString(),
            mySupportingAmount: mySupportingAmount.toString(),
            supportingAmount: supportedAmount.toString(),
            supportingToken: tokenSymbol,
            supportingTokenDecimals: tokenDecimals,
            state: bundleState,
            expiryAt: expiryAt,
            stakingSupported: stakingSupported,
            unstakingSupported: unstakingSupported,
            lockedAmount: undefined,
            stakeUsage: undefined,
            policies: 0,
        } as BundleInfo;
    }

    async getStakleableBundles(
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>,
        myWallet?: string
    ): Promise<void> {
        const instanceInfos = await this.getAllInstanceInfos();

        // loop over instances and get bundles
        for (const instanceInfo of instanceInfos) {
            const instanceId = instanceInfo.instanceId;
            const bundleNftIds = await this.getBundleNftIds();

            for (const bundleNftId of bundleNftIds) {
                const bundleInfo = await this.getBundleInfo(bundleNftId, instanceId, instanceInfo.displayName, instanceInfo.chainId, myWallet, instanceInfo.registry);
                console.log("bundleInfo", bundleInfo);
                await bundleRetrieved(bundleInfo);
            }
        }
    }

    async calculateSupportedAmount(
        dipAmount: BigNumber, 
        token: string
    ): Promise<BigNumber> {
        const s = await this.staking.calculateCapitalSupport(this.chainIdB32, token, dipAmount);
        // console.log("calculateSupportedAmount", s.toString());
        return s;
    }

    async calculateReward(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        const duration = moment.unix(bundle.expiryAt).diff(moment(), "seconds");
        // console.log("calculateReward", amount.toString(), bundle.expiryAt, duration);
        return await this.staking.calculateRewards(amount, duration);
    }

    async stake(
        bundle: BundleInfo,
        stakedAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<[ContractTransaction, ContractReceipt]> {
        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback(this.staking.address);
        }
        try {
            console.log("stake", bundle, formatEther(stakedAmount));
            // TODO check if stake nft for this bundle exists on account and if so, increment on that using stake(...)
            const tx = await this.staking.createStake(bundle.nftId, stakedAmount);

            if (beforeWaitCallback !== undefined) {
                beforeWaitCallback(this.staking.address);
            }
            const receipt = await tx.wait();
            // console.log(receipt);
            return [tx, receipt];
        } catch (e) {
            console.log("caught error while staking: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        }
    }

    async unstake(
        bundle: BundleInfo,
        unstakeAmount?: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("unstake", bundle, unstakeAmount?.toString());
        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback(this.staking.address);
        }
        try {
            let tx;

            // TODO grab nft id from account and use that to unstake
            // TODO how to handle multile nfts per wallet for the same bundle?
            if (unstakeAmount === undefined) {
                tx = await this.staking.unstakeAndClaimRewards(42);
            } else {
                tx = await this.staking.unstake(42, unstakeAmount);
            }

            if (beforeWaitCallback !== undefined) {
                beforeWaitCallback(this.staking.address);
            }
            const receipt = await tx.wait();
            // console.log(receipt);
            return [tx, receipt];
        } catch (e) {
            console.log("caught error while unstaking: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        }
    }

    async stakedAmount(bundle: BundleInfo, address: string): Promise<BigNumber> {
        // TODO loop over all nfts for this bundle and account and sum up the stakes belonging to the same bundle
        // return await this.stakingDataProvider["stakes(bytes32,address)"](bundle.targetId, address);
        return BigNumber.from(0);
    }

    async getRewardRate(): Promise<number> {
        const rewardRateRaw = await this.staking.rewardRate();
        const rateDecimals = await this.staking.rateDecimals();
        // ethers bignumber doesn't handle fractionals, thats why we need to do this manually
        const rate = rewardRateRaw.mul(10000).div(Math.pow(10, rateDecimals.toNumber()));
        return rate.toNumber() / 10000;
    }

    async getStakingWallet(): Promise<string> {
        return await this.staking.getStakingWallet();
    }

}
