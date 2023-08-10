import { parseEther } from "ethers/lib/utils";
import { StakingApi } from "../../src/backend/staking_api";

export function mockStakingApiSimple(): StakingApi {
    return {
        getChainId: jest.fn().mockReturnValue(1),
        currency: jest.fn().mockReturnValue("DIP"),
        currencyDecimals: jest.fn().mockReturnValue(18),
        minStakedAmount: jest.fn().mockReturnValue(parseEther("1000")),
        maxStakedAmount: jest.fn().mockReturnValue(parseEther("1000000")),
        retrieveBundles: jest.fn(),
        calculateSupportedAmount: jest.fn(),
        calculateReward: jest.fn(),
        createApproval: jest.fn(),
        stake: jest.fn(),
        retrieveStakesForWallet: jest.fn(),
        stakedAmount: jest.fn(),
        unstake: jest.fn(),
        hasDipBalance: jest.fn(),
        getStakeUsage: jest.fn(),
        updateBundle: jest.fn(),
        claimRewards: jest.fn(),
        fetchUnclaimedRewards: jest.fn(),
    } as StakingApi;
}