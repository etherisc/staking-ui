import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { StakeUsage } from "../utils/types";
import { BundleInfo } from "./bundle_info";
import { createDipApproval } from "./erc20";
import { GifInstanceService } from "./gif_instance_service";
import { StakingApi } from "./staking_api";
import StakingContract from "./staking_contract";
import { IERC20, IERC20Metadata, IERC20Metadata__factory, IERC20__factory } from "../contracts/registry-contracts";

export class StakingApiSmartContract implements StakingApi {
    private signer: Signer;
    private gifStakingApi: StakingContract;
    private gifInstanceService: GifInstanceService;
    private gifStakingApiInitialized = false;
    private dipToken?: IERC20;
    private dipTokenMetadata?: IERC20Metadata;
    private dipSymbol?: string;
    private dipDecimals?: number;
    private stakingContractAddress: string;

    constructor(signer: Signer, stakingContractAddress: string) {
        this.signer = signer;
        this.stakingContractAddress = stakingContractAddress;
        this.gifStakingApi = new StakingContract(signer, stakingContractAddress);
        this.gifInstanceService = new GifInstanceService(signer);
    }

    async getGifStakingApi(): Promise<StakingContract> {
        if (! this.gifStakingApiInitialized) {
            await this.gifStakingApi.initialize();
        }
        return this.gifStakingApi;
    }

    async initializeDip() {
        const dipAddress = process.env.NEXT_PUBLIC_DIP_ADDRESS ?? '0xc719d010b63e5bbf2c0551872cd5316ed26acd83';
        if(this.signer === null || this.signer.provider === null) {
            return;
        }
        this.dipToken = IERC20__factory.connect(dipAddress, this.signer);
        this.dipTokenMetadata = IERC20Metadata__factory.connect(dipAddress, this.signer);
        const [symbol, decimals] = await Promise.all([this.dipTokenMetadata.symbol(), this.dipTokenMetadata.decimals()]);
        this.dipSymbol = symbol;
        this.dipDecimals = decimals;
    }

    async getChainId(): Promise<number> {
        return (await this.signer.getChainId());
    }

    currency(): string {
        if (this.dipSymbol === undefined) {
            this.initializeDip();
        }
        return this.dipSymbol || "DIP";
    }

    currencyDecimals(): number {
        if (this.dipSymbol === undefined) {
            this.initializeDip();
        }
        return this.dipDecimals || 18;
    }

    minStakedAmount(): BigNumber {
        return process.env.NEXT_PUBLIC_DIP_MIN_STAKE_AMOUNT ? parseEther(process.env.NEXT_PUBLIC_DIP_MIN_STAKE_AMOUNT) : parseEther("1000");
    }

    maxStakedAmount(): BigNumber {
        return process.env.NEXT_PUBLIC_DIP_MAX_STAKE_AMOUNT ? parseEther(process.env.NEXT_PUBLIC_DIP_MAX_STAKE_AMOUNT) : parseEther("100000");
    }

    async retrieveBundles(): Promise<void> {
        // console.log("StakingApiSmartContract.retrieveBundles");
        await (await this.getGifStakingApi()).fetchBundles();
    }

    async updateBundle(bundle: BundleInfo): Promise<void> {
        return await (await this.getGifStakingApi()).updateBundle(bundle);
    }

    
    async calculateSupportedAmount(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        return (await this.getGifStakingApi()).calculateSupportedAmount(amount, bundle.token);
    }

    async calculateReward(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        return (await this.getGifStakingApi()).calculateReward(amount, bundle);
    }
    
    async createApproval(
        walletAddress: string, 
        amount: BigNumber, 
        beforeApprovalCallback?: ((address: string, currency: string, amount: BigNumber) => void) | undefined, 
        beforeWaitCallback?: ((address: string, currency: string, amount: BigNumber) => void) | undefined
    ): Promise<boolean> {
        const { exists, tx, receipt } = await createDipApproval(
            this.stakingContractAddress, 
            amount, 
            this.signer, 
            beforeApprovalCallback, 
            beforeWaitCallback);
        if (exists) {
            return true;
        }
        return receipt!.status === 1;
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

    async unstake(
        bundle: BundleInfo,
        nftId: string,
        max: boolean,
        unstakeAmount: BigNumber, 
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        const [tx, receipt] = await (await this.getGifStakingApi()).unstake(
            bundle,
            nftId,
            max ? undefined : unstakeAmount, 
            beforeTrxCallback, 
            beforeWaitCallback);
        return receipt.status === 1;
    }

    async hasDipBalance(amount: BigNumber): Promise<boolean> {
        return (await this.dipToken!.balanceOf(await this.signer.getAddress())).gte(amount);
    }

    async getStakeUsage(bundle: BundleInfo): Promise<{usage: StakeUsage, lockedCapital: BigNumber}> {
        const supportedAmount = BigNumber.from(bundle.supportingAmount);
        const { lockedCapital } = await this.gifInstanceService.getBundle(bundle.registry, bundle.bundleId);
        if (supportedAmount.eq(BigNumber.from(0))) {
            if (lockedCapital.gt(BigNumber.from(0))) {
                return { usage: 1, lockedCapital };
            }
            return { usage: undefined, lockedCapital: BigNumber.from(0)};
        }
        const usage = lockedCapital.mul(100).div(supportedAmount).toNumber() / 100;
        return {usage, lockedCapital};
    }

    async claimRewards(bundle: BundleInfo,
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean> {
        const [tx, receipt] =  await (await this.getGifStakingApi()).claimRewards(bundle);
        return receipt.status === 1;
    }

    async fetchUnclaimedRewards(bundle: BundleInfo): Promise<void> {
        await (await this.getGifStakingApi()).fetchUnclaimedRewards(bundle);
    }
    
}

