import { BigNumber } from "ethers";

export type BundleInfo = {
    id: string;
    instanceId: string;
    bundleId: number;
    myStakedAmount: string;
    stakedAmount: string;
    mySupportingAmount: string;
    supportingAmount: string;
    state: BundleState;
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED
}
