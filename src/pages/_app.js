/* eslint-disable no-useless-escape */

/* eslint-disable react/jsx-no-useless-fragment */

/* eslint-disable no-unused-vars */
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import Head from 'next/head';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { useEffect, useState } from 'react';
import { cacheExchange, fetchExchange, Client as UrqlClient, Provider as UrqlProvider } from 'urql';

import { AptosWalletAdapterProvider, NetworkName } from '@aptos-labs/wallet-adapter-react';
import { BloctoWallet } from '@blocto/aptos-wallet-adapter-plugin';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { NightlyWallet } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { OpenBlockWallet } from '@openblockhq/aptos-wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { TokenPocketWallet } from '@tp-lab/aptos-wallet-adapter';
import { TrustWallet } from '@trustwallet/aptos-wallet-adapter';
import { WelldoneWallet } from '@welldone-studio/aptos-wallet-adapter';

import Loading from '../component/LoadingPage';
import Mobile from '../component/Mobile';
import { ContextProvider } from '../context';
import { theme } from '../theme';
import { supportWebp } from '../utils';

const wallets = [
  new BloctoWallet({
    network: NetworkName.Testnet,
    bloctoAppId: '40782999-0ff5-48ab-848d-0369cb2582d7',
  }),
  new FewchaWallet(),
  new MartianWallet(),
  new NightlyWallet(),
  new OpenBlockWallet(),
  new PetraWallet(),
  new PontemWallet(),
  new RiseWallet(),
  new TokenPocketWallet(),
  new TrustWallet(),
  new WelldoneWallet(),
];
const client = new UrqlClient({
  // TODO: set env file for graphql endpoint
  url: 'https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql',
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: 'network-only', // disable cache
});

export default function App({ Component, pageProps }) {
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const [isSupportWebp, setIsSupportWebp] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setIsSupportWebp(supportWebp());
    setIsloading(false);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Crypto | NFT | aptos" />
        <link rel="apple-touch-icon" href="/logo192.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <title>URN</title>
      </Head>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={false}
        onError={(error) => {
          console.log('Handle Error Message', error);
        }}
      >
        <ChakraProvider theme={theme}>
          <UrqlProvider value={client}>
            <ContextProvider>
              {isLoading ? (
                <Loading />
              ) : (
                <>{isDesktop ? <Component isSupportWebp={isSupportWebp} {...pageProps} /> : <Mobile />}</>
              )}
            </ContextProvider>
          </UrqlProvider>
        </ChakraProvider>
      </AptosWalletAdapterProvider>
    </>
  );
}
