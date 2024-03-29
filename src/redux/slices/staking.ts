import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';

export interface StakingState {
    step: number;
    stakeingBundle: BundleInfo | null;
    restakingBundle: BundleInfo | null;
}

const initialState: StakingState = {
    step: 0,
    stakeingBundle: null,
    restakingBundle: null,
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
        bundleSelected: (state, action: PayloadAction<BundleInfo|null>) => {
            state.step = 2;
            state.stakeingBundle = action.payload;
        },
        bundleUnselected: (state) => {
            state.step = 1;
            state.stakeingBundle = null;
        },
        // only for restaking 
        restakingBundleSelected: (state, action: PayloadAction<BundleInfo|null>) => {
            state.step = 3;
            state.restakingBundle = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { 
    resetForm,
    setStep, 
    bundleSelected, bundleUnselected,
    restakingBundleSelected,
} = stakingSlice.actions

export default stakingSlice.reducer
