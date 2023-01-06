import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { i18n } from "next-i18next";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { getStakingApi } from '../backend/staking_api';
import Unstake from '../components/unstake/unstake';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export default function StakePage() {
  const { enqueueSnackbar } = useSnackbar();
  const {t} = useTranslation('common');
  const signer = useSelector((state: RootState) => state.chain.signer);
  const provider = useSelector((state: RootState) => state.chain.provider);

  const stakingApi = useMemo(() => getStakingApi(
    enqueueSnackbar,
    t,
    signer,
    provider,
  ), [enqueueSnackbar, signer, provider, t]);
  
  return (
    <>
      <Head>
          <title>{t('apptitle')}</title>
      </Head>
      
      <Unstake stakingApi={stakingApi} />
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations('en', ['common', 'unstake'])),   
    },
  }
}