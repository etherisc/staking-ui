import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { i18n } from "next-i18next";
import { useSnackbar } from "notistack";
import { AppContext } from "../context/app_context";
import { useContext, useMemo } from "react";
import Stake from '../components/stake/stake';
import { getStakingApi } from '../backend/staking_api';
import Stakes from '../components/stakes/stakes';

export default function StakesPage() {
    const { enqueueSnackbar } = useSnackbar();
    const {t} = useTranslation('common');
    const appContext = useContext(AppContext);

    const stakingApi = useMemo(() => getStakingApi(
        enqueueSnackbar,
        t,
        appContext.data.signer,
        appContext.data.provider,
    ), [enqueueSnackbar, appContext, t]);
    
    return (
        <>
            <Head>
                <title>{t('apptitle')}</title>
            </Head>
            
            <Stakes stakingApi={stakingApi} />
        </>
    );
}

export async function getStaticProps() {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
        ...(await serverSideTranslations('en', ['common', 'stakes'])),   
        },
    }
}