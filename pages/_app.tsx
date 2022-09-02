import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Heading, Spacer, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import listingFactory from "../eth/ListingFactory.json";

import React, { useEffect } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import logo from "../assets/img/logo.png";
import Link from "next/link";
import { SearchListingsForm } from "../components/atomic/molecules/SearchListingsForm/SearchListingsForm";
import { ColorModeSwitcher } from "../components/atomic/atoms/ColorModeSwitcher/ColorModeSwitcher";
import { theme } from "../styles/theme";
import { getListingFactoryContract } from "../hooks/useContract";
import { ethers } from "ethers";
import { SearchContextProvider } from "../context/searchContext";
import { ToastContextProvider } from "../context/ToastContext";
import { ToastContainer } from "react-toastify";
import Web3ConnectModal from "../components/atomic/organisms/Web3Modal/Web3ConnectModal";
declare var window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const { currentAccount, balance } = useWeb3();

  const [listings, setListings] = React.useState<any>();
  const [wsProvider, setWsProvider] = React.useState<any>();
  useEffect(() => {
    listingFactoryMethods.getListings();
  }, []);
  const listingFactoryContract = getListingFactoryContract();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const eventProvider = new ethers.providers.WebSocketProvider(
        window.ethereum
      );
      setWsProvider(eventProvider);
    }
  }, []);

  // FIXME: ABSTRACT TO HOOK

  const handleCreateListing = () => {
    console.log("startin nig er ");
    listingFactoryContract?.on("CreateListing", () => {
      console.log("Wow so smert, much thoughts, ingelegant!");
    });
  };

  // =============== LISTING ==================================
  const listingFactoryMethods = {
    async getListings() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const response = await listingFactoryContract?.getListings();
          setListings(response);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async createListing(
      title: string,
      description: string,
      cost: number,
      ipfsHash: string
    ) {
      if (typeof window.ethereum !== "undefined") {
        try {
          const response = await listingFactoryContract?.createListing(
            title,
            description,
            cost,
            ipfsHash
          );
          console.log("ipfs", ipfsHash);
          console.log("res", response);
          handleCreateListing();
          listingFactoryMethods.getListings();
        } catch (error) {
          console.log(error);
        }
      }
    },
  };

  return (
    <ToastContextProvider>
      <ToastContainer />
      <SearchContextProvider>
        <ChakraProvider theme={theme}>
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
                <Heading size={"md"} fontWeight={"semibold"}>
                  {" "}
                  W3B Travel
                </Heading>
              </div>

              <Stack
                borderRadius={"48px"}
                boxShadow={"md"}
                direction="row"
                alignItems={"center"}
                spacing={4}
              >
                <SearchListingsForm />
              </Stack>

              <Stack direction="row" alignItems={"center"} spacing={4}>
                <Web3ConnectModal />
                <ColorModeSwitcher />
              </Stack>
            </div>

            <Component
              methods={listingFactoryMethods}
              data={listings}
              {...pageProps}
            />
          </>
        </ChakraProvider>
      </SearchContextProvider>
    </ToastContextProvider>
  );
}

export default MyApp;
