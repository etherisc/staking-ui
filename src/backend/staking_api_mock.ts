import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";
import { delay } from "../utils/delay";
import { BundleInfo, BundleState } from "./bundle_info";
import { hasBalance } from "./erc20";
import { StakingApi } from "./staking_api";

const BUNDLES = [
    {
        id: "0x1234567890-1",
        instanceId: "0x1234567890",
        bundleId: 1,
        myStakedAmount: parseEther("100").toString(),
        stakedAmount: parseEther("1000").toString(),
        mySupportingAmount: parseEther("1000").toString(),
        supportingAmount: parseEther("10000").toString(),
        supportingToken: "USDT",
        supportingTokenDecimals: 6,
        state: BundleState.ACTIVE
    } as BundleInfo,
    {
        id: "0x1234567890-2",
        instanceId: "0x1234567890",
        bundleId: 2,
        myStakedAmount: parseEther("0").toString(),
        stakedAmount: parseEther("3000").toString(),
        mySupportingAmount: parseEther("0").toString(),
        supportingAmount: parseEther("30000").toString(),
        supportingToken: "USDT",
        supportingTokenDecimals: 6,
        state: BundleState.ACTIVE
    } as BundleInfo,
    {
        id: "0x2345678901-1",
        instanceId: "0x2345678901",
        bundleId: 1,
        myStakedAmount: parseEther("2300").toString(),
        stakedAmount: parseEther("15000").toString(),
        mySupportingAmount: parseEther("23000").toString(),
        supportingAmount: parseEther("150000").toString(),
        supportingToken: "USDT",
        supportingTokenDecimals: 6,
        state: BundleState.ACTIVE
    } as BundleInfo,
];

export default function stakingApiMock(
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey) 
    : StakingApi {
    return {
        currency: (): string => { return "DIP"; },
        currencyDecimals: (): number => { return 18; },
        minStakedAmount: (): BigNumber => { return parseEther("1000"); },
        maxStakedAmount: (): BigNumber => { return parseEther("100000"); },
        retrieveBundles: async (
            bundleRetrieved: ((bundle: BundleInfo) => Promise<void>),
            loadingFinished: () => void,
        ): Promise<void> => {
            BUNDLES.forEach(async (bundle) => bundleRetrieved(bundle));
            loadingFinished();
            return Promise.resolve();
        },
        calculateSupportedAmount(amount, bundle) {
            console.log(amount);
            return Promise.resolve(amount.mul(10));
        },
        calculateReward(amount: BigNumber, bundle: BundleInfo) {
            return Promise.resolve(amount.mul(0.01));
        },
        async createApproval(walletAddress: string, premium: BigNumber) {
            enqueueSnackbar(`Approval mocked (${walletAddress}, ${formatEther(premium)}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async stake(bundle: BundleInfo, stakedAmount: BigNumber) {
            enqueueSnackbar(`Stake mocked (${bundle.instanceId}, ${bundle.bundleId}, ${formatEther(stakedAmount)}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async retrieveStakesForWallet(address: string, bundleRetrieved: ((bundle: BundleInfo) => Promise<void>), loadingFinished: () => void) {
            BUNDLES.forEach(async (bundle) => bundleRetrieved(bundle));
            loadingFinished();
            return Promise.resolve();
        },
        stakedAmount(bundle: BundleInfo, address: string): Promise<BigNumber> {
            return Promise.resolve(parseEther("10000"));
        },
        async unstake(bundle: BundleInfo, max:boolean, unstakeAmount: BigNumber) {
            enqueueSnackbar(`Unstake mocked (${bundle.instanceId}, ${bundle.bundleId}, ${formatEther(unstakeAmount)}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async hasDipBalance(amount: BigNumber): Promise<boolean> {
            return true;
        },
        async getRewardRate() {
            return Promise.resolve(0.1);
        }
    }
}
