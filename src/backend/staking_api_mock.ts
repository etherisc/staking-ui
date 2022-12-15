import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";
import { delay } from "../utils/delay";
import { BundleInfo, BundleState } from "./bundle_info";
import { StakingApi } from "./staking_api";

const BUNDLES = [
    {
        id: "0x1234567890-1",
        instanceId: "0x1234567890",
        bundleId: 1,
        myStakedAmount: parseEther("100"),
        stakedAmount: parseEther("1000"),
        mySupportingAmount: parseEther("1000"),
        supportingAmount: parseEther("10000"),
        state: BundleState.ACTIVE
    } as BundleInfo,
    {
        id: "0x1234567890-2",
        instanceId: "0x1234567890",
        bundleId: 2,
        myStakedAmount: parseEther("0"),
        stakedAmount: parseEther("3000"),
        mySupportingAmount: parseEther("0"),
        supportingAmount: parseEther("30000"),
        state: BundleState.ACTIVE
    } as BundleInfo,
    {
        id: "0x2345678901-1",
        instanceId: "0x2345678901",
        bundleId: 1,
        myStakedAmount: parseEther("2300"),
        stakedAmount: parseEther("15000"),
        mySupportingAmount: parseEther("23000"),
        supportingAmount: parseEther("150000"),
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
        async createTreasuryApproval(walletAddress: string, premium: BigNumber) {
            enqueueSnackbar(`Approval mocked (${walletAddress}, ${formatEther(premium)}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async stake(instanceId: string, bundleId: number, stakedAmount: BigNumber) {
            enqueueSnackbar(`Stake mocked (${instanceId}, ${bundleId}, ${formatEther(stakedAmount)}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async retrieveStakesForWallet(address: string, bundleRetrieved: ((bundle: BundleInfo) => Promise<void>), loadingFinished: () => void) {
            BUNDLES.forEach(async (bundle) => bundleRetrieved(bundle));
            loadingFinished();
            return Promise.resolve();
        }
    }
}
