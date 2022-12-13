import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';

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
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    add, reset, startLoading, finishLoading,
} = stakesSlice.actions

export default stakesSlice.reducer
