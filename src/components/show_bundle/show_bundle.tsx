import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { BundleInfo } from "../../backend/bundle_info";
import { StakingApi } from "../../backend/staking_api";
import { selectBundle } from "../../redux/slices/stakes";
import BundleActions from "./bundle_actions";
import BundleDetails from "./bundle_details";

interface ShowBundleProps {
    stakingApi: StakingApi;
    bundle: BundleInfo;
}

export default function ShowBundle(props: ShowBundleProps) {
    const dispatch = useDispatch();
    const { t } = useTranslation(['stakes', 'common']);
    const bundle = props.bundle;
    const currency = props.stakingApi.currency();
    const decimals = props.stakingApi.currencyDecimals();

    return (<>
        <Typography variant="h5" mb={2}>
            <Typography variant="h6" mb={2} component="span">
                <FontAwesomeIcon icon={faArrowLeft} style={{ cursor: 'pointer' }} onClick={() => dispatch(selectBundle(undefined))} />
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
                <BundleActions bundle={bundle} />
            </Grid>
        </Grid>
    </>);
}