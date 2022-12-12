import { BundleInfo } from "../../backend/bundle_info";
import Typography from '@mui/material/Typography'
import { useTranslation } from "next-i18next";
import { Grid } from "@mui/material";
import { Heading2 } from "../heading";

interface BundleDetailsProps {
    bundle: BundleInfo;
}

export default function BundleDetails(props: BundleDetailsProps) {
    const { t } = useTranslation(['stake', 'common']);
    
    return (<>
        <Heading2>{t('bundle_information')}</Heading2>
        <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
                {t('instance_id')}
            </Grid>
            <Grid item xs={6} md={2}>
                {props.bundle.instanceId}
            </Grid>
            <Grid item xs={6} md={2}>
                {t('bundle_id')}
            </Grid>
            <Grid item xs={6} md={2}>
                {props.bundle.bundleId}
            </Grid>
            <Grid item xs={6} md={2}>
                {t('bundle_state')}
            </Grid>
            <Grid item xs={6} md={2}>
                {props.bundle.state}
            </Grid>
        </Grid>
    </>);
}