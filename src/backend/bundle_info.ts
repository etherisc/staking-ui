import { StakeUsage } from "../utils/types";

// all BigNumber are stored as strings to avoid serialization issue with BigNumber
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
    myStakedAmount: string;
    // list of nft ids whose stake has been added to myStakedAmount
    myStakedNfsIds: string[];
    stakedAmount: string;
    unclaimedReward: string;
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
    rewardRate: number;
}

export enum BundleState {
    ACTIVE,
    LOCKED,
    CLOSED,
    BURNED,
}
