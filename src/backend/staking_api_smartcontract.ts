import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { parse } from "path";
import { BundleInfo } from "./bundle_info";
import { createDipApproval } from "./erc20";
import { StakingApi } from "./staking_api";
import StakingContract from "./staking_contract";

export class StakingApiSmartContract implements StakingApi {
    private signer: Signer;
    private stakingContractAddress: string;
    private gifStakingApi: StakingContract;
    private gifStakingApiInitialized = false;

    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        this.stakingContractAddress = stakingContractAddress;
        this.gifStakingApi = new StakingContract(signer, stakingContractAddress);
    }

    async getGifStakingApi(): Promise<StakingContract> {
        if (! this.gifStakingApiInitialized) {
            await this.gifStakingApi.initialize();
        }
        return this.gifStakingApi;
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
        // console.log("StakingApiSmartContract.retrieveBundles");
        await (await this.getGifStakingApi()).getStakleableBundles(bundleRetrieved);
        loadingFinished();
    }

    async retrieveStakesForWallet(
        walletAddress: string, 
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>, 
        loadingFinished: () => void
    ): Promise<void> {
        console.log("StakingApiSmartContract.retrieveStakesForWallet");
        await (await this.getGifStakingApi()).getStakleableBundles(bundleRetrieved, walletAddress);
        loadingFinished();
    }
    
    async calculateSupportedAmount(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        return (await this.getGifStakingApi()).calculateSupportedAmount(amount, bundle.chainId, bundle.token);
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
        const [tx, receipt] = await (await this.getGifStakingApi()).stake(
            bundle,
            stakedAmount, 
            beforeTrxCallback, 
            beforeWaitCallback);
        return receipt.status === 1;
    }

    async stakedAmount(bundle: BundleInfo, address: string): Promise<BigNumber> {
        return (await this.getGifStakingApi()).stakedAmount(bundle, address);
    }

    async unstake(
        bundle: BundleInfo,
        max: boolean,
        unstakeAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        const [tx, receipt] = await (await this.getGifStakingApi()).unstake(
            bundle,
            max ? undefined : unstakeAmount, 
            beforeTrxCallback, 
            beforeWaitCallback);
        return receipt.status === 1;
    }
    
}