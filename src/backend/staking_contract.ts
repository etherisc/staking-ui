import { BigNumber, ContractReceipt, ContractTransaction, Signer } from "ethers";
import { BundleInfo } from "./bundle_info";
import { TransactionFailedError } from "../utils/error";
import { IBundleDataProvider, IBundleDataProvider__factory, IERC20Metadata__factory, IStaking, IStakingDataProvider, IStakingDataProvider__factory, IStaking__factory } from "../contracts/depeg-contracts";
import moment from "moment";

export default class StakingContract {
    private signer: Signer;
    private stakingDataProvider: IStakingDataProvider;
    private staking: IStaking;
    private bundleDataProvider?: IBundleDataProvider;
    private knownTokens: Map<string, [string, number]> = new Map();
    
    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        this.stakingDataProvider = IStakingDataProvider__factory.connect(stakingContractAddress, signer);
        this.staking = IStaking__factory.connect(stakingContractAddress, signer);
    }

    async initialize(): Promise<void> {
        const bundleRegistryAddress = await this.stakingDataProvider.getBundleRegistry()
        this.bundleDataProvider = IBundleDataProvider__factory.connect(bundleRegistryAddress, this.signer);
    }

    async getAllInstanceInfos() {
        const instanceInfos = [];
        const numInstances = await (this.bundleDataProvider!).instances();
        // console.log("numInstances", numInstances);
        // loop over instances and get instance id
        for (let i = 0; i < numInstances.toNumber(); i++) {
            const instanceId = await (this.bundleDataProvider!).getInstanceId(i);
            const instanceInfo = await (this.bundleDataProvider!).getInstanceInfo(instanceId);
            const[id, _1, name, chainid, registry, _2, _3] = instanceInfo;
            instanceInfos.push({id, name, chainid: chainid.toNumber(), registry});
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

    async getBundleIds(instanceId: string): Promise<Array<BigNumber>> {
        const bundlesIds = [];
        // console.log("instance", instanceId);
        const components = await this.bundleDataProvider!.components(instanceId);
        for (let componentIdx = 0; componentIdx < components.toNumber(); componentIdx++) {
            const componentId = await this.bundleDataProvider!.getComponentId(instanceId, componentIdx);
            // normally we would check component type for riskpool, but we only have riskpool atm so this step can be skipped for now
            const numBundles = await (this.bundleDataProvider!).bundles(instanceId, componentId);
            // console.log("component", componentId, "bundles", numBundles);

            for (let bundleIdx = 0; bundleIdx < numBundles.toNumber(); bundleIdx++) {
                const bundleId = await (this.bundleDataProvider!).getBundleId(instanceId, componentId, bundleIdx);
                bundlesIds.push(bundleId);
            }
        }
        return bundlesIds;
    }

    async getBundleInfo(instanceId: string, instanceName: string, chainId: number, bundleId: BigNumber, myWallet: string | undefined): Promise<BundleInfo> {
        const [_key, _riskpoolId, token, state, _name, expiryAt, _closedAt, _createdAt, _updatedAt] = 
                    await (this.bundleDataProvider!).getBundleInfo(instanceId, bundleId);

        const stakedAmount = await this.stakingDataProvider["getBundleStakes(bytes32,uint256)"](instanceId, bundleId);
        let myStakedAmount = BigNumber.from(0);
        const supportedAmount = await this.calculateSupportedAmount(stakedAmount, chainId, token);
        let mySupportingAmount = BigNumber.from(0);

        if (myWallet !== undefined) {
            myStakedAmount = await this.stakingDataProvider["getBundleStakes(bytes32,uint256,address)"](instanceId, bundleId, myWallet);
            mySupportingAmount = await this.calculateSupportedAmount(myStakedAmount, chainId, token);
        }

        const [tokenSymbol, tokenDecimals] = await this.getToken(token);

        const bundleInfo = {
            id: `${instanceId}-${bundleId}`,
            chainId: chainId,
            instanceId: instanceId,
            instanceName: instanceName,
            bundleId: bundleId.toNumber(),
            token: token,
            myStakedAmount: myStakedAmount.toString(),
            stakedAmount: stakedAmount.toString(),
            mySupportingAmount: mySupportingAmount.toString(),
            supportingAmount: supportedAmount.toString(),
            supportingToken: tokenSymbol,
            supportingTokenDecimals: tokenDecimals,
            state: state,
            expiryAt: expiryAt.toNumber(),
        } as BundleInfo;
        return bundleInfo;
    }

    async getStakleableBundles(
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>,
        myWallet?: string
    ): Promise<void> {
        const instanceInfos = await this.getAllInstanceInfos();

        // loop over instances and get bundles
        for (const instanceInfo of instanceInfos) {
            const instanceId = instanceInfo.id;
            const bundleIds = await this.getBundleIds(instanceId);

            for (const bundleId of bundleIds) {
                const bundleInfo = await this.getBundleInfo(instanceId, instanceInfo.name, instanceInfo.chainid, bundleId, myWallet);
                console.log("bundleInfo", bundleInfo);
                await bundleRetrieved(bundleInfo);
            }
        }
    }

    async calculateSupportedAmount(
        dipAmount: BigNumber, 
        chainId: number, 
        token: string
    ): Promise<BigNumber> {
        // console.log("calculateSupportedAmount", dipAmount.toString(), chainId, instanceId, token);
        const s = await this.stakingDataProvider.calculateCapitalSupport(token, chainId, dipAmount);
        // console.log("calculateSupportedAmount", s.toString());
        return s;
    }

    async calculateReward(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        const duration = moment.unix(bundle.expiryAt).diff(moment(), "seconds");
        console.log("calculateReward", amount.toString(), bundle.expiryAt, duration);
        return await this.stakingDataProvider.calculateRewards(amount, duration);
    }

    async stake(
        bundle: BundleInfo,
        stakedAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<[ContractTransaction, ContractReceipt]> {
        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback(this.stakingDataProvider.address);
        }
        try {
            const tx = await this.staking.stakeForBundle(bundle.instanceId, bundle.bundleId, stakedAmount);

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
        stakedAmount?: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("unstake", bundle, stakedAmount?.toString());
        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback(this.staking.address);
        }
        try {
            let tx;

            if (stakedAmount === undefined) {
                tx = await this.staking["unstakeFromBundle(bytes32,uint256)"](bundle.instanceId, bundle.bundleId);
            } else {
                tx = await this.staking["unstakeFromBundle(bytes32,uint256,uint256)"](bundle.instanceId, bundle.bundleId, stakedAmount);
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
        return await this.stakingDataProvider["getBundleStakes(bytes32,uint256,address)"](bundle.instanceId, bundle.bundleId, address);
    }

    async getRewardRate(): Promise<number> {
        const rewardRateParts = await this.staking.fromRate(await this.staking.getRewardRate());
        // console.log("rewardRateParts", rewardRateParts);
        // ethers bignumber doesn't handle fractionals, thats why we need to do this manually
        const rate = rewardRateParts[0].mul(10000).div(rewardRateParts[1]);
        return rate.toNumber() / 10000;
    }

}
