import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import {
  ThorinGlobalStyles,
  darkTheme,
  lightTheme,
  Profile,
  Heading,
  Typography,
  Input,
} from "@ensdomains/thorin";

import React from "react";
import { useWeb3 } from "../hooks/useWeb3";
function MyApp({ Component, pageProps }: AppProps) {
  const { currentAccount, onClickConnect, onClickDisconnect ,} = useWeb3();
  return (
    <ThemeProvider theme={darkTheme}>
      <ThorinGlobalStyles />
      <div className="nav">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Heading color="blue">Decentralized Travel</Heading>
          <Input
            hideLabel
            label="Wallet Address"
            placeholder="Search for Properties"
            width={"300px"}
          />
        </div>

        <Profile
          onClick={currentAccount ? onClickDisconnect : onClickConnect}
          address={currentAccount}
          ensName={currentAccount ? "Diego" : "Log In"}
        />
     
      </div>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
