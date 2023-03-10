import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';
import { BigNumber } from 'ethers';
import { NftInfo } from '../../backend/nft_info';

export interface StakesState {
    bundles: BundleInfo[];
    // nft ids of the nfts that are owned by the current connected wallet
    ownedNfts: NftInfo[];
    isLoadingBundles: boolean;
}

const initialState: StakesState = {
    bundles: [],
    ownedNfts: [],
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
        addAmountToMyStakes: (state, action: PayloadAction<{stakeNftId: string, target: string, amountToAdd: string}>) => {
            const bundle = state.bundles.find((bundle) => bundle.nftId === action.payload.target);
            if (bundle && bundle.myStakedNfsIds.indexOf(action.payload.stakeNftId) === -1) {
                const myStakedAmount = BigNumber.from(bundle.myStakedAmount);
                const amountToAdd = BigNumber.from(action.payload.amountToAdd);
                bundle.myStakedAmount = myStakedAmount.add(amountToAdd).toString();
                bundle.myStakedNfsIds.push(action.payload.stakeNftId);
            }
        },
        updateStakeUsage: (state, action: PayloadAction<{bundleId: number, usage: number | undefined, lockedCapital: string}>) => {
            const bundle = state.bundles.find((bundle) => bundle.bundleId === action.payload.bundleId);
            if (bundle) {
                bundle.stakeUsage = action.payload.usage;
                bundle.lockedAmount = action.payload.lockedCapital;
            }
        },
        reset: (state) => {
            state.bundles = [];
        },
        addNftId: (state, action: PayloadAction<NftInfo>) => {
            const hasNft = state.ownedNfts.find((n) => n.nftId === action.payload.nftId) !== undefined;
            if (!hasNft) {
                state.ownedNfts.push(action.payload);
            }
        },
        clearNftIds: (state) => {
            state.ownedNfts = [];
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
    add, updateStakeUsage, reset, addAmountToMyStakes,
    addNftId, clearNftIds,
    startLoading, finishLoading,
} = stakesSlice.actions

export default stakesSlice.reducer
