'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { getStakingApi } from '../backend/staking_api';
import StakingDashboard from '../components/staking_dashboard/staking_dashboard';
import { RootState } from '../redux/store';

function DashboardPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('common');
  const signer = useSelector((state: RootState) => state.chain.signer);
  const provider = useSelector((state: RootState) => state.chain.provider);

  const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "";
  const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "";

  // console.log("auth0", auth0Domain, auth0ClientId);

  const stakingApi = useMemo(() => getStakingApi(
    enqueueSnackbar,
    t,
    signer,
    provider,
  ), [enqueueSnackbar, signer, provider, t]);
  
  // console.log("xxxx", window.location.href);

  return (
    <>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.href,
        }}
        >
        <Head>
            <title>{t('apptitle')}</title>
        </Head>
        
        <StakingDashboard stakingApi={stakingApi} />
      </Auth0Provider>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations('en', ['common', 'stake'])),   
    },
  }
}

export default dynamic(() => Promise.resolve(DashboardPage), {ssr: false})
