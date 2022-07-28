import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Avatar, AvatarBadge, Button, Spacer, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { ChakraProvider } from "@chakra-ui/react";

import React from "react";
import { useWeb3 } from "../hooks/useWeb3";
import logo from "../assets/img/logo.png";
import Link from "next/link";
import { SiweLogin } from "../siwe/siwe";
declare var window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const { currentAccount , balance } = useWeb3();
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href={"/"}>
              <Image height={"40px"} width={"40px"} src={logo} alt="" />
            </Link>
            <Spacer w={"10px"} />
            <div> W3B Travel</div>
          </div>

          <Stack direction="row" alignItems={"center"} spacing={4}>
           

            <Button> {balance} </Button>
            <SiweLogin />
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
