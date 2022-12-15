import { BigNumber } from "ethers";

export type BundleInfo = {
    id: string;
    instanceId: string;
    bundleId: number;
    token: string;
    myStakedAmount: BigNumber;
    stakedAmount: BigNumber;
    mySupportingAmount: BigNumber;
    supportingAmount: BigNumber;
    state: BundleState;
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED
}
