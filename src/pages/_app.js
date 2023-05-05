import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from '@aptos-labs/wallet-adapter-react';
import { Client as UrqlClient, Provider as UrqlProvider, cacheExchange, fetchExchange } from 'urql';
import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { NightlyWallet } from "@nightlylabs/aptos-wallet-adapter-plugin";
import { OpenBlockWallet } from "@openblockhq/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { TokenPocketWallet } from "@tp-lab/aptos-wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { MSafeWalletAdapter } from "msafe-plugin-wallet-adapter";
import { WelldoneWallet } from "@welldone-studio/aptos-wallet-adapter";
import { theme } from '../theme';
import { ContextProvider } from '../context';
import { supportWebp } from '../utils';
import Mobile from '../component/Mobile';

const wallets = [
  new BloctoWallet({
    network: NetworkName.Testnet,
    bloctoAppId: '6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46',
  }),
  new FewchaWallet(),
  new MartianWallet(),
  new MSafeWalletAdapter(),
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
});

export default function App({ Component, pageProps }) {
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const [isSupportWebp, setIsSupportWebp] = useState(true);

  useEffect(() => {
    setIsSupportWebp(supportWebp());
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Crypto | NFT | aptos"
        />
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
          <ContextProvider>
            <UrqlProvider value={client}>
              {
                isDesktop ? (
                  <Component isSupportWebp={isSupportWebp} {...pageProps} />
                ) : (
                  <Mobile />
                )
              }
            </UrqlProvider>
          </ContextProvider>
        </ChakraProvider>
      </AptosWalletAdapterProvider>
    </>
  );
}
