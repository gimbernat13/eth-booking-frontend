import {useColorMode} from '@chakra-ui/react';
import {
  RainbowKitProvider,
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
} from '@rainbow-me/rainbowkit';
import React from 'react';

type Props = {
  children: any;
  chains: any;
};

export const Layout = ({children, chains}: Props) => {
  const {colorMode} = useColorMode();
  return (
    <RainbowKitProvider
      theme={colorMode === 'light' ? rainbowLightTheme() : rainbowDarkTheme()}
      chains={chains}
    >
      {children}
    </RainbowKitProvider>
  );
};
