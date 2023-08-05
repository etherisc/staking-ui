export interface StakeData {
    id: string;
    target: string;
    stakeBalance: string;
    rewardBalance: string;
    createdAt: number;
    updatedAt: number;
    version: number;
    rewardTotalNow: string;
    bundleId: string;
    bundleName: string;
    bundleExpiryAt: string;
    stakeOwner: string;
    stakingStarted: number;
    unstakingAfter: string;
}