import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import React from "react";
import { useWeb3 } from "../hooks/useWeb3";
import logo from "../assets/img/logo.png";
import Head from "next/head";
import Link from "next/link";
function MyApp({ Component, pageProps }: AppProps) {
  const { currentAccount, onClickConnect, onClickDisconnect } = useWeb3();
  return (
    <ChakraProvider>
      <>
        <div className="nav">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href={"/"}>
              <Image height={"50px"} width={"50px"} src={logo} alt="" />
            </Link>

            <Text as="h3" style={{ marginLeft: "5px" }}>
              {/* B<span style={{ fontSize: " 14px" }}>3</span>B */}
            </Text>
          </div>
        </div>
        <Component {...pageProps} />
      </>
    </ChakraProvider>
  );
}

export default MyApp;
