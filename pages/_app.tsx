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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <div className="nav">
        <div>
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
