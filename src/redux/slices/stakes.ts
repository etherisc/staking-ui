import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleInfo } from '../../backend/bundle_info';
import { BigNumber } from 'ethers';
import { NftInfo } from '../../backend/nft_info';

export interface StakesState {
    bundles: BundleInfo[];
    selectedBundleIdx: number|null;
    // nft ids of the nfts that are owned by the current connected wallet
    ownedNfts: NftInfo[];
    isLoadingBundles: boolean;
}

const initialState: StakesState = {
    bundles: [],
    selectedBundleIdx: null,
    ownedNfts: [],
    isLoadingBundles: false,
}

export const stakesSlice = createSlice({
    name: 'stakes',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<BundleInfo>) => {
            const idx = state.bundles.findIndex((bundle) => bundle.id === action.payload.id);
            if (idx === -1) {
                state.bundles.push(action.payload);
            } else {
                // replace bundle
                state.bundles[idx] = action.payload;
            }
        },
        addAmountToMyStakes: (state, action: PayloadAction<{stakeNftId: string, target: string, amount: string, supportingAmount: string}>) => {
            const bundle = state.bundles.find((bundle) => bundle.nftId === action.payload.target);
            if (bundle && bundle.myStakedNfsIds.indexOf(action.payload.stakeNftId) === -1) {
                const myStakedAmount = BigNumber.from(bundle.myStakedAmount);
                const amountToAdd = BigNumber.from(action.payload.amount);
                const mySupportingAmount = BigNumber.from(bundle.mySupportingAmount);
                const supportingAmountToAdd = BigNumber.from(action.payload.supportingAmount);
                bundle.myStakedAmount = myStakedAmount.add(amountToAdd).toString();
                bundle.mySupportingAmount = mySupportingAmount.add(supportingAmountToAdd).toString();
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
            const nftIdx = state.ownedNfts.findIndex((n) => n.nftId === action.payload.nftId);
            if (nftIdx === -1) {
                state.ownedNfts.push(action.payload);
            } else {
                state.ownedNfts[nftIdx] = action.payload;
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
        selectBundle: (state, action: PayloadAction<number>) => {
            state.selectedBundleIdx = action.payload;
        },
        clearSelectedBundle: (state) => {
            state.selectedBundleIdx = null;
        },
        setUnclaimedRewards: (state, action: PayloadAction<{bundleId: number, unclaimedReward: string}>) => {
            const bundle = state.bundles.find((bundle) => bundle.bundleId === action.payload.bundleId);
            if (bundle) {
                bundle.unclaimedReward = action.payload.unclaimedReward;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { 
    add, updateStakeUsage, reset, addAmountToMyStakes,
    addNftId, clearNftIds,
    startLoading, finishLoading,
    selectBundle, clearSelectedBundle,
    setUnclaimedRewards,
} = stakesSlice.actions

export default stakesSlice.reducer
