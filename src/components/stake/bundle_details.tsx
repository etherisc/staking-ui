import { BundleInfo } from "../../backend/bundle_info";
import Typography from '@mui/material/Typography'
import { useTranslation } from "next-i18next";
import { Card, CardContent, Grid } from "@mui/material";
import { Heading2 } from "../heading";
import { formatInstanceId } from "../../utils/format";

interface BundleDetailsProps {
    bundle: BundleInfo;
}

export default function BundleDetails(props: BundleDetailsProps) {
    const { t } = useTranslation(['common']);
    
    return (<>
        <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4}
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}
                            sx={{ ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                            <Grid item xs={12}>
                                <Heading2>{t('bundle_information')}</Heading2>
                            </Grid>
                            <Grid item xs={5} md={2} >
                                {t('instance_id')}
                            </Grid>
                            <Grid item xs={7} sx={{ display: { xs: 'block', md: 'none'}}}>
                                {formatInstanceId(props.bundle.instanceId)}
                            </Grid>
                            <Grid item xs={10} sx={{ display: { xs: 'none', md: 'block'}}}>
                                {props.bundle.instanceId}
                            </Grid>
                            {props.bundle.instanceName && (<>
                                <Grid item xs={5} md={2}>
                                    {t('instance_name')}
                                </Grid>
                                <Grid item xs={7} md={10}>
                                    {props.bundle.instanceName}
                                </Grid>
                            </>)}
                            <Grid item xs={5} md={2}>
                                {t('bundle_id')}
                            </Grid>
                            <Grid item xs={7} md={4}>
                                {props.bundle.bundleId}
                            </Grid>
                            <Grid item xs={5} md={2}>
                                {t('bundle_name')}
                            </Grid>
                            <Grid item xs={7} md={4}>
                                {props.bundle.bundleName}
                            </Grid>
                            <Grid item xs={5} md={2}>
                                {t('bundle_state')}
                            </Grid>
                            <Grid item xs={7} md={4}>
                                {t(`bundle_state_${props.bundle.state}`, { ns: "common" })}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>);
}