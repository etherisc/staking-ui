import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';

export interface StakingState {
    step: number;
    bundles: BundleInfo[];
    isLoadingBundles: boolean;
    stakeingBundle: BundleInfo | null;
}

const initialState: StakingState = {
    step: 0,
    bundles: [],
    isLoadingBundles: false,
    stakeingBundle: null,
}

export const stakingSlice = createSlice({
    name: 'staking',
    initialState,
    reducers: {
        resetForm: (state) => {
            Object.assign(state, initialState);
        },
        stepForward: (state) => {
            state.step += 1;
        },
        stepBackward: (state) => {
            state.step -= 1;
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        add: (state, action: PayloadAction<BundleInfo>) => {
            const hasBundle = state.bundles.find((bundle) => bundle.id === action.payload.id) !== undefined;
            if (! hasBundle) {
                state.bundles.push(action.payload);
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
        bundleSelected: (state, action: PayloadAction<BundleInfo|null>) => {
            state.step = 2;
            state.stakeingBundle = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    resetForm,
    setStep, 
    add, reset, startLoading, finishLoading,
    bundleSelected 
} = stakingSlice.actions

export default stakingSlice.reducer
