import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Button, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import logo from "../assets/img/logo.png";
import Head from "next/head";
import Link from "next/link";
import { ethers } from "ethers";
declare var window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainname, setChainName] = useState<string | undefined>();

 
  return (
    <ChakraProvider>
      <>
        <div className="nav">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href={"/"}>
              <Image height={"50px"} width={"50px"} src={logo} alt="" />
            </Link>
            <Wrap>
              {/* <WrapItem>
                <Button onClick={onClickConnect}> Connect Wallet</Button>
              </WrapItem> */}
            </Wrap>
            <Wrap>
              <WrapItem></WrapItem>
            </Wrap>
            <Wrap>
              <WrapItem>{currentAccount}</WrapItem>
            </Wrap>

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
