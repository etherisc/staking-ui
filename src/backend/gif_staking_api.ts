import { BigNumber, ContractReceipt, ContractTransaction, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { GifStaking, GifStaking__factory } from "../contracts/depeg-contracts";
import { BundleInfo } from "./bundle_info";
import { StakingApiSmartContract } from "./staking_api_smartcontract";

export default class GifStakingApi {
    private signer: Signer;
    private gifStaking: GifStaking;

    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        this.gifStaking = GifStaking__factory.connect(stakingContractAddress, signer);
    }

    async getStakleableBundles(
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>
    ): Promise<void> {
        const bundleCount = (await this.gifStaking.bundles()).toNumber();
        console.log("bundleCount", bundleCount);

        for (let i = 0; i < bundleCount; i++) {
            const [ instanceId, bundleId ] = await this.gifStaking.getBundleKey(i);
            const [ key, chainId, token, state, closedSince, createdAt, updatedAt ] = 
                await this.gifStaking.getBundleInfo(instanceId, bundleId);
            console.log(instanceId, bundleId.toNumber(), token);
            const stakedAmount = await this.gifStaking.getBundleStakes(instanceId, bundleId);
            const supportedAmount = await this.gifStaking.getSupportedCapitalAmount(instanceId, bundleId, token);
            const bundleInfo = {
                id: `${instanceId}-${bundleId}`,
                instanceId: instanceId,
                bundleId: bundleId.toNumber(),
                token: token,
                myStakedAmount: "0",
                stakedAmount: stakedAmount.toString(),
                mySupportingAmount: "0",
                supportingAmount: supportedAmount.toString(),
                state: state,
            } as BundleInfo;
            console.log("bundleInfo", bundleInfo);
            await bundleRetrieved(bundleInfo);
        }
    }

    async calculateSupportedAmount(dipAmount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        const instanceInfo = await this.gifStaking.getInstanceInfo(bundle.instanceId);
        return await this.gifStaking.calculateTokenAmountFromStaking(dipAmount, instanceInfo[1], bundle.token);
    }

    async stake(
        bundle: BundleInfo,
        stakedAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<[ContractTransaction, ContractReceipt]> {
        if (beforeTrxCallback !== undefined) {
            beforeTrxCallback(this.gifStaking.address);
        }
        try {
            const tx = await this.gifStaking.stake(bundle.instanceId, bundle.bundleId, stakedAmount);

            if (beforeWaitCallback !== undefined) {
                beforeWaitCallback(this.gifStaking.address);
            }
            const receipt = await tx.wait();
            // console.log(receipt);
            return [tx, receipt];
        } catch (e) {
            console.log("caught error while applying for policy: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        }


    }

}