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
        <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4} 
            sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
            <Grid item xs={12}>
                <Heading2>{t('bundle_information')}</Heading2>
            </Grid>
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