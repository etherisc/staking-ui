import { Button, Grid } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { bundleSelected } from "../../redux/slices/staking";

interface BundleDetailsProps {
    bundle: BundleInfo;
    claimRewards: (bundle: BundleInfo) => Promise<boolean>
}

export default function BundleActions(props: BundleDetailsProps) {
    const { t } = useTranslation('stakes');
    const dispatch = useDispatch();
    const router = useRouter();

    const bundle = props.bundle;
    const isStakingAllowed = props.bundle.stakingSupported;
    // TODO: my stake > 0
    const isUnstakingAllowed = props.bundle.unstakingSupported;
    // TODO: if unclaimed rewards === 0 -> disable button
    const isClaimRewardsAllowed = props.bundle.myStakedNfsIds.length > 0;
    
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