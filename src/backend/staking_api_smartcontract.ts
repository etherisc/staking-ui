import { BigNumber, Signer } from "ethers";
import { formatBytes32String, formatEther, formatUnits, parseEther } from "ethers/lib/utils";
import { IERC20, IERC20Metadata, IERC20Metadata__factory, IERC20__factory } from "../contracts/depeg-contracts";
import { IInstanceService, IInstanceService__factory, IRegistry__factory } from "../contracts/gif-interface";
import { BundleInfo } from "./bundle_info";
import { createDipApproval } from "./erc20";
import { StakingApi } from "./staking_api";
import StakingContract from "./staking_contract";

export class StakingApiSmartContract implements StakingApi {
    private signer: Signer;
    private stakingContractAddress: string;
    private gifStakingApi: StakingContract;
    private gifStakingApiInitialized = false;
    private dipToken?: IERC20;
    private dipTokenMetadata?: IERC20Metadata;
    private dipSymbol?: string;
    private dipDecimals?: number;

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

    async calculateReward(amount: BigNumber, bundle: BundleInfo): Promise<BigNumber> {
        return (await this.getGifStakingApi()).calculateReward(amount, bundle);
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

    async hasDipBalance(amount: BigNumber): Promise<boolean> {
        return (await this.dipToken!.balanceOf(await this.signer.getAddress())).gte(amount);
    }

    async getRewardRate(): Promise<number> {
        return (await this.getGifStakingApi()).getRewardRate();
    }

    async getStakeUsage(bundle: BundleInfo): Promise<number> {
        const supportedAmount = BigNumber.from(bundle.supportingAmount);
        const instanceService = await this.getInstanceService(bundle.registry);
        const { lockedCapital } = await instanceService.getBundle(bundle.bundleId);
        if (supportedAmount.eq(BigNumber.from(0))) {
            if (lockedCapital.gt(BigNumber.from(0))) {
                return 1;
            }
            return -1;
        }
        return lockedCapital.mul(100).div(supportedAmount).toNumber() / 100;
    }

    async getInstanceService(registryAddress: string): Promise<IInstanceService> {
        const registry = IRegistry__factory.connect(registryAddress, this.signer);
        const instanceServiceAddress = await registry.getContract(formatBytes32String("InstanceService"));
        // console.log("instanceServiceAddress", instanceServiceAddress);
        return IInstanceService__factory.connect(instanceServiceAddress, this.signer);
    }
    
}

