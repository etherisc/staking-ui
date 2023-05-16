import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { faCubesStacked, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../../styles/globals.css';
import Layout from '../components/layout/layout';
import { etheriscTheme } from '../config/theme';
import { RootState, store } from '../redux/store';
import { getAndUpdateWalletAccount } from '../utils/wallet';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { removeSigner } from '../utils/chain';
import { clearSelectedBundle } from '../redux/slices/stakes';
import { bundleUnselected } from '../redux/slices/staking';
import { nanoid } from '@reduxjs/toolkit';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache'
import { encodeBase64 } from '../utils/base64';
config.autoAddCss = false; /* eslint-disable import/first */

export function App(appProps: AppProps) {
  const production = process.env.NODE_ENV === 'production';
  const nonce = encodeBase64(nanoid());
  const cache = createCache({
    key: 'my-prefix-key',
    nonce: nonce,
    prepend: true,
  });
  const csp = 
    "default-src 'self';" 
    + "style-src 'self' 'unsafe-inline'; "
    + `script-src 'nonce-${nonce}' 'self' ${production ? '' : "'unsafe-eval'"}; `;

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta httpEquiv="Content-Security-Policy" content={csp}/>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== undefined && 
        <GoogleAnalytics trackPageViews />
      }
      <CacheProvider value={cache}>
        <ThemeProvider theme={etheriscTheme}>
          <CssBaseline enableColorScheme />
          <Provider store={store}>
            <AppWithBlockchainConnection {...appProps} />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </React.Fragment>
  );
}

export default appWithTranslation(App);


export function AppWithBlockchainConnection(appProps: AppProps) {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
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
          removeSigner(dispatch);
        } else {
          getAndUpdateWalletAccount(dispatch);
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
    [t('nav.link.stakes'), '/', () => dispatch(clearSelectedBundle()), faCubesStacked],
    [t('nav.link.stake'), '/stake', () => dispatch(bundleUnselected()), faRightToBracket],
    [t('nav.link.unstake'), '/unstake', () => dispatch(bundleUnselected()), faRightFromBracket],
  ];

  appProps.pageProps.items = items;
  appProps.pageProps.title = t('apptitle_short');

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }}>
      <Layout {...appProps} />
    </SnackbarProvider>
  );
}

