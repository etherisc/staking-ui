import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { delay } from "../utils/delay";
import { BundleInfo, BundleState } from "./bundle_info";
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
        getChainId: () => Promise.resolve(1234),
        currency: (): string => { return "DIP"; },
        currencyDecimals: (): number => { return 18; },
        minStakedAmount: (): BigNumber => { return parseEther("1000"); },
        maxStakedAmount: (): BigNumber => { return parseEther("100000"); },
        retrieveBundles: async (
        ): Promise<void> => {
            return Promise.resolve();
        },
        updateBundle(bundle: BundleInfo): Promise<void> {
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
        async unstake(bundle: BundleInfo, nftdId: string, max: boolean, unstakeAmount: BigNumber) {
            enqueueSnackbar(`Unstake mocked (${bundle.instanceId}, ${bundle.bundleId}, ${formatEther(unstakeAmount)}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async hasDipBalance(amount: BigNumber): Promise<boolean> {
            return true;
        },
        async getRewardRate() {
            return Promise.resolve(0.1);
        },
        async getStakeUsage(bundle: BundleInfo) {
            return Promise.resolve({ usage: 0.5, lockedCapital: BigNumber.from(1000)});
        },
        async claimRewards() {
            return Promise.resolve(true);
        }
    }
}
