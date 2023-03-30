import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { SnackbarKey, useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import useNotifications from "../../hooks/notifications";
import { clearSelectedBundle } from "../../redux/slices/stakes";
import { TransactionFailedError } from "../../utils/error";
import { ga_event } from "../../utils/google_analytics";
import BundleActions from "./bundle_actions";
import BundleDetails from "./bundle_details";


interface ShowBundleProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
}

export default function ShowBundle(props: ShowBundleProps) {
    const dispatch = useDispatch();
    const { t } = useTranslation(['stakes', 'common']);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showPersistentErrorSnackbarWithCopyDetails } = useNotifications();
    const bundle = props.bundle;
    const currency = props.stakingApi.currency();
    const decimals = props.stakingApi.currencyDecimals();

    if (bundle !== undefined && bundle.myStakedNfsIds.length >= 0) {
        props.stakingApi.fetchUnclaimedRewards(bundle);
    }

    async function claimRewards(bundle: BundleInfo): Promise<boolean> {
        ga_event("trx_start_claim_rewards", { category: 'chain_trx' });
        let snackbar: SnackbarKey | undefined = undefined;
        try {
            const res = await props.stakingApi.claimRewards(
                bundle,
                (address: string) => {
                    snackbar = enqueueSnackbar(
                        t('claim_rewards_info', { address }),
                        { variant: "warning", persist: true }
                    );
                },
                () => {
                    if (snackbar !== undefined) {
                        closeSnackbar(snackbar);
                    }
                    snackbar = enqueueSnackbar(
                        t('unstake_wait'),
                        { variant: "info", persist: true }
                    );
                });
            ga_event("trx_success_claim_rewards", { category: 'chain_trx' });
            return res;
        } catch(e) { 
            if ( e instanceof TransactionFailedError) {
                ga_event("trx_fail_claim_rewards", { category: 'chain_trx' });
                console.log("transaction failed", e);
                if (snackbar !== undefined) {
                    closeSnackbar(snackbar);
                }

                showPersistentErrorSnackbarWithCopyDetails(
                    t('error.transaction_failed', { ns: 'common', error: e.code }),
                    e.reason
                );
                return Promise.resolve(false);
            } else {
                ga_event("trx_fail_other_claim_rewards", { category: 'chain_trx' });
                throw e;
            }
        } finally {
            await props.stakingApi.updateBundle(bundle);
            if (snackbar !== undefined) {
                closeSnackbar(snackbar);
            }
        }
    }

    if (bundle === undefined) {
        return (<>{t('fetching_bundle')}</>);
    }

    return (<>
        <Typography variant="h5" mb={2}>
            <Typography variant="h6" mb={2} component="span">
                <FontAwesomeIcon icon={faArrowLeft} style={{ cursor: 'pointer' }} onClick={() => dispatch(clearSelectedBundle())} />
            </Typography>
            &nbsp;
            {t('title_show_bundle')}
            &nbsp;
            <b>{bundle.bundleName}</b>
            &nbsp;
            (#{bundle.bundleId})
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
                <BundleDetails bundle={bundle} currency={currency} decimals={decimals} />
            </Grid>
            <Grid item xs={12} md={6}>
                <BundleActions bundle={bundle} claimRewards={claimRewards} />
            </Grid>
        </Grid>
    </>);
}