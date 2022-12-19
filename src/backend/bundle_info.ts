import { BigNumber } from "ethers";

export type BundleInfo = {
    id: string;
    instanceId: string;
    bundleId: number;
    token: string;
    // numbers are stored as strings to avoid serialization issue with BigNumber
    myStakedAmount: string;
    stakedAmount: string;
    mySupportingAmount: string;
    supportingAmount: string;
    supportingToken: string;
    supportingTokenDecimals: number;
    state: BundleState;
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED
}
