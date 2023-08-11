import { BigNumber, ethers, Signer } from "ethers";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { StakeUsage } from "../utils/types";
import { BundleInfo } from "./bundle_info";
import stakingApiMock from "./staking_api_mock";
import { StakingApiSmartContract } from "./staking_api_smartcontract";

export interface StakingApi {
    getChainId(): Promise<number>;
    currency(): string;
    currencyDecimals(): number;
    minStakedAmount(): BigNumber;
    maxStakedAmount(): BigNumber;
    retrieveBundles: () => Promise<void>;
    updateBundle(bundle: BundleInfo): Promise<void>;
    calculateSupportedAmount: (
        amount: BigNumber,
        bundle: BundleInfo,
    ) => Promise<BigNumber>;
    calculateReward: (
        amount: BigNumber,
        bundle: BundleInfo,
    ) => Promise<BigNumber>;
    createApproval: (
        walletAddress: string, 
        amount: BigNumber,
        beforeApprovalCallback?: (address: string, currency: string, amount: BigNumber) => void,
        beforeWaitCallback?: (address: string, currency: string, amount: BigNumber) => void
    ) => Promise<boolean>;
    stake: (
        bundle: BundleInfo,
        stakedAmount: BigNumber,
        gasless: boolean,
        beforeTrxCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void
    ) => Promise<boolean>;
    restake: (
        stakeNftId: BigNumber,
        oldBundleNftId: BigNumber, 
        newTargetNftId: BigNumber, 
        gasless: boolean,
        beforeTrxCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void
    ) => Promise<boolean>;
    unstake: (
        bundle: BundleInfo,
        nftId: string,
        max: boolean,
        unstakeAmount: BigNumber,
        beforeTrxCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void
    ) => Promise<boolean>;
    hasDipBalance: (
        amount: BigNumber,
    ) => Promise<boolean>;
    /**
     * Get a number indicating if the locked capital is sufficiently covered by the staked amount. 
     * if between 0 and 1, the staked amount is too low. If > 1, the staked amount is sufficient.
     */
    getStakeUsage(bundle: BundleInfo): Promise<{usage: StakeUsage, lockedCapital: BigNumber}>;
    claimRewards(
        bundle: BundleInfo,
        beforeTrxCallback?: ((address: string) => void) | undefined, 
        beforeWaitCallback?: ((address: string) => void) | undefined
    ): Promise<boolean>;
    fetchUnclaimedRewards(bundle: BundleInfo): Promise<void>;
}

export function getStakingApi(
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey, 
    t: (key: string) => string,
    signer?: Signer,
    provider?: ethers.providers.Provider
    ): StakingApi {

    const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
    if (stakingContractAddress == null) {
        console.log("Using mock staking API");
        return stakingApiMock(enqueueSnackbar);
    } else {
        console.log("Using smart contract @", stakingContractAddress);
        let api: StakingApi;
        if (signer === undefined || provider === undefined) {
            api = new StakingApiSmartContract(new ethers.VoidSigner(stakingContractAddress, provider), stakingContractAddress);
        } else {
            api = new StakingApiSmartContract(signer, stakingContractAddress);
        }
        return api;
    }
}