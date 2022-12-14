import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { parse } from "path";
import { BundleInfo } from "./bundle_info";
import { StakingApi } from "./staking_api";

export class StakingApiSmartContract implements StakingApi {
    private signer: Signer;

    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        // TODO: staking api contract instance
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
        // TODO: implement
    }

    async retrieveStakesForWallet(
        address: string, 
        bundleRetrieved: (bundle: BundleInfo) => Promise<void>, 
        loadingFinished: () => void
    ): Promise<void> {
        // TODO: implement
    }
    
    async calculateSupportedAmount(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        // TODO: implement
        return Promise.resolve(BigNumber.from(0));
    }
    
    async createTreasuryApproval(
        walletAddress: string, 
        amount: BigNumber, 
        beforeApprovalCallback?: ((address: string, currency: string, amount: BigNumber) => void) | undefined, 
        beforeWaitCallback?: ((address: string, currency: string, amount: BigNumber) => void) | undefined
    ): Promise<boolean> {
        // TODO: implement
        return Promise.resolve(true);
    }

    async stake(
        instanceId: string, 
        number: number, 
        stakedAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        // TODO: implement
        return Promise.resolve(true);
    }
    
}