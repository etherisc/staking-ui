import { BigNumber } from "ethers";

export type BundleInfo = {
    id: string;
    instanceId: string;
    bundleId: number;
    stakedAmount: string;
    supportingAmount: string;
    state: BundleState;
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED
}
