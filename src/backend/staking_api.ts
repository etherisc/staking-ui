import { BigNumber, ethers, Signer } from "ethers";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { BundleInfo } from "./bundle_info";
import stakingApiMock from "./staking_api_mock";
import { StakingApiSmartContract } from "./staking_api_smartcontract";

export interface StakingApi {

    currency(): string;
    currencyDecimals(): number;
    minStakedAmount(): BigNumber;
    maxStakedAmount(): BigNumber;
    retrieveBundles: (
        bundleRetrieved: ((bundle: BundleInfo) => Promise<void>),
        loadingFinished: () => void,
    ) => Promise<void>;
    calculateSupportedAmount: (
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
        beforeTrxCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void
    ) => Promise<boolean>;
    retrieveStakesForWallet: (
        address: string,
        bundleRetrieved: ((bundle: BundleInfo) => Promise<void>),
        loadingFinished: () => void,
    ) => Promise<void>;
    stakedAmount: (
        bundle: BundleInfo,
        address: string,
    ) => Promise<BigNumber>;
    unstake: (
        bundle: BundleInfo,
        max: boolean,
        unstakeAmount: BigNumber,
        beforeTrxCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void
    ) => Promise<boolean>;
    hasDipBalance: (
        amount: BigNumber,
    ) => Promise<boolean>;
    getRewardRate: () => Promise<number>;
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