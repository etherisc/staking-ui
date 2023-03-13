import { Button, Grid } from "@mui/material";
import { BigNumber } from "ethers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { bundleSelected } from "../../redux/slices/staking";
import { RootState } from "../../redux/store";

interface BundleDetailsProps {
    bundle: BundleInfo;
    claimRewards: (bundle: BundleInfo) => Promise<boolean>
}

export default function BundleActions(props: BundleDetailsProps) {
    const { t } = useTranslation('stakes');
    const dispatch = useDispatch();
    const router = useRouter();
    const ownedNfts = useSelector((state: RootState) => state.stakes.ownedNfts);

    const bundle = props.bundle;
    const isStakingAllowed = bundle.stakingSupported;
    const isUnstakingAllowed = 
        bundle.unstakingSupported &&
        // Check if there is at least one NFT that is staked
        ownedNfts.filter(nft => bundle.myStakedNfsIds.includes(nft.nftId) && BigNumber.from(nft.stakedAmount).gt(0)).length > 0;
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


    return (<Grid container spacing={2} data-testid="bundle-actions">
        <Grid item xs={12}>
            <Button 
                onClick={stake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isStakingAllowed}
                >{t('action.stake')}</Button>
        </Grid>
        <Grid item xs={12}>
            <Button 
                onClick={unstake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isUnstakingAllowed}
                >{t('action.unstake')}</Button>
        </Grid>
        <Grid item xs={12}>
            <Button 
                onClick={claimRewards}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                disabled={!isClaimRewardsAllowed}
                >{t('action.claim_rewards')}</Button>
        </Grid>
    </Grid>);
}