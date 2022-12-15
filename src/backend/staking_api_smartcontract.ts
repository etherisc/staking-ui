import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { parse } from "path";
import { BundleInfo } from "./bundle_info";
import { createDipApproval } from "./erc20";
import GifStakingApi from "./gif_staking_api";
import { StakingApi } from "./staking_api";

export class StakingApiSmartContract implements StakingApi {
    private signer: Signer;
    private stakingContractAddress: string;
    private gifStakingApi: GifStakingApi;

    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        this.stakingContractAddress = stakingContractAddress;
        this.gifStakingApi = new GifStakingApi(signer, stakingContractAddress);
    }

    currency(): string {
        return process.env.NEXT_PUBLIC_DIP_SYMBOL || "DIP";
    }

    currencyDecimals(): number {
        return parseInt(process.env.NEXT_PUBLIC_DIP_DECIMALS || "18");
    }

    minStakedAmount(): BigNumber {
        return process.env.NEXT_PUBLIC_DIP_MIN_STAKE_AMOUNT ? parseEther(process.env.NEXT_PUBLIC_DIP_MIN_STAKE_AMOUNT) : parseEther("1000");
    }

    maxStakedAmount(): BigNumber {
        return process.env.NEXT_PUBLIC_DIP_MAX_STAKE_AMOUNT ? parseEther(process.env.NEXT_PUBLIC_DIP_MAX_STAKE_AMOUNT) : parseEther("100000");
    }

    async retrieveBundles(
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>, 
        loadingFinished: () => void
    ): Promise<void> {
        console.log("StakingApiSmartContract.retrieveBundles");
        await this.gifStakingApi.getStakleableBundles(bundleRetrieved);
        loadingFinished();
    }

    async retrieveStakesForWallet(
        walletAddress: string, 
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>, 
        loadingFinished: () => void
    ): Promise<void> {
        console.log("StakingApiSmartContract.retrieveStakesForWallet");
        await this.gifStakingApi.getStakleableBundles(bundleRetrieved, walletAddress);
        loadingFinished();
    }
    
    async calculateSupportedAmount(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        return this.gifStakingApi.calculateSupportedAmount(amount, bundle.instanceId, bundle.token);
    }
    
    async createApproval(
        walletAddress: string, 
        amount: BigNumber, 
        beforeApprovalCallback?: ((address: string, currency: string, amount: BigNumber) => void) | undefined, 
        beforeWaitCallback?: ((address: string, currency: string, amount: BigNumber) => void) | undefined
    ): Promise<boolean> {
        const [tx, receipt] = await createDipApproval(
            this.stakingContractAddress, 
            amount, 
            this.signer, 
            beforeApprovalCallback, 
            beforeWaitCallback);
        return receipt.status === 1;
    }

    async stake(
        bundle: BundleInfo,
        stakedAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        const [tx, receipt] = await this.gifStakingApi.stake(
            bundle,
            stakedAmount, 
            beforeTrxCallback, 
            beforeWaitCallback);
        return receipt.status === 1;
    }
    
}