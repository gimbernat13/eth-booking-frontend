import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import {
  Avatar,
  AvatarBadge,
  Button,
  Heading,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="nav"
        >
          <div>
            <Link href={"/"}>
              <Image height={"50px"} width={"50px"} src={logo} alt="" />
            </Link>
          </div>

          <Stack direction="row" spacing={4}>
            <Avatar>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>

            {/* You can also change the borderColor and bg of the badge */}
            {/* <Avatar>
              <AvatarBadge
                borderColor="papayawhip"
                bg="tomato"
                boxSize="1.25em"
              />
            </Avatar> */}
          </Stack>
        </div>
        <Component {...pageProps} />
      </>
    </ChakraProvider>
  );
}

export default MyApp;
