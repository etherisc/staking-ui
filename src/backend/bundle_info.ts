import { LogMaximumNumberOfActiveBundlesSetEventFilter } from "../contracts/depeg-contracts/BasicRiskpool2";
import { StakeUsage } from "../utils/types";

export type BundleInfo = {
    id: string;
    chainId: number;
    instanceId: string;
    instanceName: string;
    registry: string;
    riskpoolId: number;
    bundleId: number;
    bundleName: string;
    nftId: string;
    token: string;
    // numbers are stored as strings to avoid serialization issue with BigNumber
    myStakedAmount: string;
    stakedAmount: string;
    mySupportingAmount: string;
    supportingAmount: string;
    supportingToken: string;
    supportingTokenDecimals: number;
    state: BundleState;
    expiryAt: number;
    stakingSupported: boolean;
    unstakingSupported: boolean;
    lockedAmount: string | undefined;
    stakeUsage: StakeUsage;
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED,
}
