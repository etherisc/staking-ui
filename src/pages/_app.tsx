import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useReducer } from 'react';
import Head from 'next/head';
import { initialAppData, removeSigner, AppContext, signerReducer } from '../context/app_context';
import { SnackbarProvider } from 'notistack';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { getAndUpdateWalletAccount } from '../utils/wallet';
import { ThemeProvider } from '@mui/material/styles';
import { etheriscTheme } from '../config/theme';
import Layout from '../components/layout/layout';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import { faRightToBracket, faRightFromBracket, faCubesStacked } from "@fortawesome/free-solid-svg-icons";


export function App(appProps: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ThemeProvider theme={etheriscTheme}>
        <CssBaseline enableColorScheme />
        <Provider store={store}>
          <AppWithBlockchainConnection {...appProps} />
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default appWithTranslation(App);


export function AppWithBlockchainConnection(appProps: AppProps) {
  const { t } = useTranslation('common');
  const [ data, dispatch ] = useReducer(signerReducer, initialAppData());
  const reduxDispatch = useDispatch();
  const provider = useSelector((state: RootState) => state.chain.provider);

  if (provider != undefined) {
    provider.on('network', (newNetwork: any, oldNetwork: any) => {
      console.log('network', newNetwork, oldNetwork);
      location.reload();
    });

    // @ts-ignore
    if (window.ethereum !== undefined) {
      // @ts-ignore
      window.ethereum.on('accountsChanged', function (accounts: string[]) {
        console.log('accountsChanged', accounts);
        if (accounts.length == 0) {
          removeSigner(reduxDispatch);
        } else {
          getAndUpdateWalletAccount(reduxDispatch);
        }
      });
      // @ts-ignore
      window.ethereum.on('chainChanged', function (chain: any) {
        console.log('chainChanged', chain);
        location.reload();
      });
      // @ts-ignore
      window.ethereum.on('network', (newNetwork: any, oldNetwork: any) => {
        console.log('network', newNetwork, oldNetwork);
        location.reload();
      });
    }
  }

  let items = [
    [t('nav.link.stakes'), '/stakes', faCubesStacked],
    [t('nav.link.stake'), '/', faRightToBracket],
    [t('nav.link.unstake'), '/unstake', faRightFromBracket],
  ];

  appProps.pageProps.items = items;
  appProps.pageProps.title = t('apptitle_short');

  return (
    <AppContext.Provider value={{ data, dispatch}} >
      <SnackbarProvider maxSnack={3}>
        <Layout {...appProps} />
      </SnackbarProvider>
    </AppContext.Provider>
  );
}

