import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";
import { delay } from "../utils/delay";
import { BundleInfo, BundleState } from "./bundle_info";
import { StakingApi } from "./staking_api";

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
            const bundles = [
                {
                    id: "0x1234567890-1",
                    instanceId: "0x1234567890",
                    bundleId: 1,
                    stakedAmount: parseEther("1000").toString(),
                    supportingAmount: parseEther("10000").toString(),
                    state: BundleState.ACTIVE
                } as BundleInfo,
                {
                    id: "0x1234567890-2",
                    instanceId: "0x1234567890",
                    bundleId: 2,
                    stakedAmount: parseEther("3000").toString(),
                    supportingAmount: parseEther("30000").toString(),
                    state: BundleState.ACTIVE
                } as BundleInfo,
                {
                    id: "0x2345678901-1",
                    instanceId: "0x2345678901",
                    bundleId: 1,
                    stakedAmount: parseEther("15000").toString(),
                    supportingAmount: parseEther("150000").toString(),
                    state: BundleState.ACTIVE
                } as BundleInfo,
            ];

            bundles.forEach(async (bundle) => bundleRetrieved(bundle));
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
        }
    }
}
