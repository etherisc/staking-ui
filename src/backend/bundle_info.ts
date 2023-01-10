import { BigNumber } from "ethers";

export type BundleInfo = {
    id: string;
    chainId: number;
    instanceId: string;
    instanceName: string;
    bundleId: number;
    bundleName: string;
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
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED
}
