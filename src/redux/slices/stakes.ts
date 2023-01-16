import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';
import { BigNumber } from 'ethers';

export interface StakesState {
    bundles: BundleInfo[];
    isLoadingBundles: boolean;
}

const initialState: StakesState = {
    bundles: [],
    isLoadingBundles: false,
}

export const stakesSlice = createSlice({
    name: 'stakes',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<BundleInfo>) => {
            const hasBundle = state.bundles.find((bundle) => bundle.id === action.payload.id) !== undefined;
            if (!hasBundle) {
                state.bundles.push(action.payload);
            }
        },
        updateStakeUsage: (state, action: PayloadAction<{bundleId: number, usage: number, lockedCapital: string}>) => {
            const bundle = state.bundles.find((bundle) => bundle.bundleId === action.payload.bundleId);
            if (bundle) {
                bundle.stakeUsage = action.payload.usage;
                bundle.lockedAmount = action.payload.lockedCapital;
            }
        },
        reset: (state) => {
            state.bundles = [];
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
    add, updateStakeUsage, reset, startLoading, finishLoading,
} = stakesSlice.actions

export default stakesSlice.reducer
