import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';

export interface CounterState {
    bundles: BundleInfo[];
    isLoadingBundles: boolean;
}

const initialState: CounterState = {
    bundles: [],
    isLoadingBundles: false,
}

export const stakingSlice = createSlice({
    name: 'staking',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<BundleInfo>) => {
            state.bundles.push(action.payload);
        },
        reset: (state) => {
            state.bundles = [];
        },
        startLoading: (state) => {
            state.isLoadingBundles = true;
        },
        finishLoading: (state) => {
            state.isLoadingBundles = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { add, reset, startLoading, finishLoading } = stakingSlice.actions

export default stakingSlice.reducer
