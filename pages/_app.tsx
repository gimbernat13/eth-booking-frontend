/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';

import {getDefaultWallets} from '@rainbow-me/rainbowkit';
import {configureChains, createClient, goerli, WagmiConfig} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';
import React from 'react';
import {theme} from '../styles/theme';
import {SearchContextProvider} from '../context/searchContext';
import ResponsiveNavbar from '../components/atomic/molecules/ResponsiveNavbar/ResponsiveNavBar';
import {Layout} from '../components/atomic/atoms/Layout/Layout';

const API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_KEY ?
  process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_KEY :
  '';

const {chains, provider} = configureChains(
    [goerli],
    [alchemyProvider({apiKey: API_KEY}), publicProvider()],
);
const {connectors} = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({Component, pageProps}: AppProps) {
  const [colorMode, setColorMode] = React.useState('');

  if (typeof window !== 'undefined') {
    const storedColorMode = localStorage.getItem('chakra-ui-color-mode');
    React.useEffect(() => {
      if (storedColorMode) {
        setColorMode(storedColorMode);
      }
    }, [storedColorMode, setColorMode]);
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme}>
        <Layout chains={chains}>
          <SearchContextProvider>
            <>
              <ResponsiveNavbar />
              <Component {...pageProps} />
            </>
          </SearchContextProvider>
        </Layout>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
