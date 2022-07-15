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
import { useWeb3 } from "../hooks/useWeb3";
import { useListingContract } from "../hooks/useListingContract";

function MyApp({ Component, pageProps }: AppProps) {
  const { provider } = useWeb3();
  const caca = useListingContract();
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
          address="0xb6e040c9ecaae172a89bd561c5f73e1c48d28cd9"
          ensName="diego.eth"
        />
      </div>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
