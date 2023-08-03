'use client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { i18n } from "next-i18next";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import Stake from '../components/stake/stake';
import { getStakingApi } from '../backend/staking_api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import StakingDashboard from '../components/staking_dashboard/staking_dashboard';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import dynamic from 'next/dynamic';

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
