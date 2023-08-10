import { Button, Grid } from "@mui/material";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo, BundleState } from "../../backend/bundle_info";
import { bundleSelected } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";
import { BundleAction, setBundleAction } from "../../redux/slices/stakes";
import { NftInfo } from "../../backend/nft_info";

interface BundleActionsProps {
    bundle: BundleInfo;
    ownedNfts: NftInfo[];
    claimRewards: (bundle: BundleInfo) => Promise<boolean>
}

export default function BundleActions(props: BundleActionsProps) {
    const { t } = useTranslation('stakes');
    const dispatch = useDispatch();
    const router = useRouter();
    const ownedNfts = useSelector((state: RootState) => state.stakes.ownedNfts);

    const bundle = props.bundle;

    const hasStakeInBundle = ownedNfts.filter(nft => bundle.myStakedNfsIds.includes(nft.nftId) && BigNumber.from(nft.stakedAmount).gt(0)).length > 0;

    const isStakingAllowed = 
        bundle.stakingSupported 
        && (bundle.state === 0 || bundle.state === 1)
        && bundle.expiryAt > dayjs().unix();
    const isUnstakingAllowed = 
        bundle.unstakingSupported &&
        // Check if there is at least one NFT that is staked
        hasStakeInBundle;
    const isRestakingAllowed =
        hasStakeInBundle 
        && (bundle.state === BundleState.CLOSED || bundle.state === BundleState.BURNED);
    // any unclaimed rewards left
    const isClaimRewardsAllowed = bundle.myStakedNfsIds.length > 0 && BigNumber.from(bundle.unclaimedReward).gt(0);
    
    function stake() {
        dispatch(bundleSelected(bundle))
        router.push("/stake?noreset=true", undefined, { shallow: true });
    }

    function unstake() {
        dispatch(bundleSelected(bundle))
        router.push("/unstake?noreset=true", undefined, { shallow: true });
    }

    async function claimRewards() {
        await props.claimRewards(bundle);
    }

    async function restake() {
        dispatch(bundleSelected(bundle))
        dispatch(setBundleAction(BundleAction.Restake))
    }


    return (<Grid container spacing={2} data-testid="bundle-actions">
        <Grid item xs={12}>
            <Button 
                onClick={stake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isStakingAllowed}
                data-testid="button-stake"
                >{t('action.stake')}</Button>
        </Grid>
        <Grid item xs={12}>
            <Button 
                onClick={unstake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isUnstakingAllowed}
                data-testid="button-unstake"
                >{t('action.unstake')}</Button>
        </Grid>
        <Grid item xs={12}>
            <Button 
                onClick={claimRewards}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isClaimRewardsAllowed}
                data-testid="button-claim-rewards"
                >{t('action.claim_rewards')}</Button>
        </Grid>
        <Grid item xs={12}>
            <Button 
                onClick={restake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isRestakingAllowed}
                >{t('action.restake')}</Button>
        </Grid>
    </Grid>);
}