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
    const isUnstakingAllowed = props.bundle.unstakingSupported;
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
        {isStakingAllowed && <Grid item xs={12}>
            <Button 
                onClick={stake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                >{t('action.stake')}</Button>
        </Grid>}
        {isUnstakingAllowed && <Grid item xs={12}>
            <Button 
                onClick={unstake}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                >{t('action.unstake')}</Button>
        </Grid>}
        {isClaimRewardsAllowed && <Grid item xs={12}>
            <Button 
                onClick={claimRewards}
                variant="contained" 
                sx={{ minWidth: '12rem' }}
                >{t('action.claim_rewards')}</Button>
        </Grid>}
    </Grid>);
}