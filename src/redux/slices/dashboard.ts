import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';
import { BigNumber } from 'ethers';
import { NftInfo } from '../../backend/nft_info';
import { StakeData } from '../../backend/stake_data';
import stakes from './stakes';

export interface DashboardState {
    numStakes: number;
    stakes: StakeData[];
    isLoadingBundles: boolean;
}

const initialState: DashboardState = {
    numStakes: 0,
    stakes: [],
    isLoadingBundles: false,
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
            } else {
                // replace bundle
                state.stakes[idx] = action.payload;
            }
        },
        clearStakes: (state) => {
            state.stakes = [];
            state.numStakes = 0;
        },
        startLoading: (state) => {
            state.isLoadingBundles = true;
        },
        finishLoading: (state) => {
            state.isLoadingBundles = false;
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
} = dashboardSlice.actions

export default dashboardSlice.reducer
