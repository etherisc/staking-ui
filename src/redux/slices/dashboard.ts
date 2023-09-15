import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { StakeData } from '../../backend/stake_data';
import { BigNumber } from 'ethers';

export interface DashboardState {
    numStakes: number;
    totalStaked: string;
    totalRewards: string;
    stakes: StakeData[];
    isLoadingStakes: boolean;
    rewardReserves: string;
    stakingAllowance: string;
}

const initialState: DashboardState = {
    numStakes: 0,
    totalStaked: BigNumber.from(0).toString(),
    totalRewards: BigNumber.from(0).toString(),
    stakes: [],
    isLoadingStakes: false,
    rewardReserves: BigNumber.from(0).toString(),
    stakingAllowance: BigNumber.from(0).toString(),
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setNumber: (state, action: PayloadAction<number>) => {
            state.numStakes = action.payload;
        },
        addStakeData: (state, action: PayloadAction<StakeData>) => {
            const idx = state.stakes.findIndex((stake) => stake.id === action.payload.id);
            if (idx === -1) {
                state.stakes.push(action.payload);
                state.totalStaked = BigNumber.from(state.totalStaked).add(action.payload.stakeBalance).toString();  
                state.totalRewards = BigNumber.from(state.totalRewards).add(action.payload.rewardTotalNow).toString();
            } else {
                // replace bundle
                state.totalStaked = BigNumber.from(state.totalStaked).sub(state.stakes[idx].stakeBalance).toString();
                state.totalRewards = BigNumber.from(state.totalRewards).sub(state.stakes[idx].rewardTotalNow).toString();
                state.stakes[idx] = action.payload;
                state.totalStaked = BigNumber.from(state.totalStaked).add(action.payload.stakeBalance).toString();
                state.totalRewards = BigNumber.from(state.totalRewards).add(action.payload.rewardTotalNow).toString();
            }
            
        },
        clearStakes: (state) => {
            state.stakes = [];
            state.numStakes = 0;
        },
        startLoading: (state) => {
            state.isLoadingStakes = true;
        },
        finishLoading: (state) => {
            state.isLoadingStakes = false;
        },
        setRewardReserves: (state, action: PayloadAction<string>) => {
            state.rewardReserves = action.payload;
        },
        setStakingAllowance: (state, action: PayloadAction<string>) => {
            state.stakingAllowance = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    setNumber,
    addStakeData,
    clearStakes,
    startLoading,
    finishLoading,
    setRewardReserves,
    setStakingAllowance,
} = dashboardSlice.actions

export default dashboardSlice.reducer
