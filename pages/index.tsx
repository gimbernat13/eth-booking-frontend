import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import { ListingCard } from "../components/ListingCard/ListingCard";
import { useWeb3 } from "../hooks/useWeb3";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  Text,
  Wrap,
  WrapItem,
  Divider,
  Center,
  Box,
  Badge,
  Heading,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import { CreateListingForm } from "../components/atomic/organisms/CreateListingForm/CreateListingForm";

declare let window: any;

const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const MainGrid = styled.div`
  /* display: grid;
  grid-template-columns: auto; */
`;
const Home: NextPage = () => {
  const [provider, setProvider] = React.useState<any>();
  const [listings, setListings] = React.useState<any>();
  const { currentAccount } = useWeb3();
  const LISTING_FACTORY_ABI = [
    // Some details about the token
    "function getListings() view returns (address[])",
    "function createListing(uint, string , string)",
  ];

  useEffect(() => {
    listingFactoryMethods.getListings();
  }, []);

  // FIXME: ABSTRACT TO HOOK
  async function initListingFactory() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(currentAccount);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      LISTING_FACTORY_ABI,
      provider
    );
    return contract;
  }

  // =============== LISTING ==================================
  const listingFactoryMethods = {
    async getListings() {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          console.log("fetching listings", await contract.getListings());
          const response = await contract.getListings();
          setListings(response);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async createListing() {
      // const iface = new ethers.utils.Interface(LISTING_ABI);

      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          const response = await contract.createListing(
            "333",
            "niggas on a roll ",
            666
          );
          console.log("response ", response);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };
  const { onClickConnect } = useWeb3();
  console.log(currentAccount)

  return (
    <div className={styles.container}>
      <Text as="h3">Close to your location: </Text>
      <Heading> {currentAccount} </Heading>

      <Heading onClick={onClickConnect}> Bitch </Heading>
      <MainGrid>
        <StyledListingCardGrid>
          {listings &&
            listings.map((listing: any) => {
              return (
                <Link key={listing} href={`/listings/${listing}`}>
                  <div>
                    <ListingCard address={listing} />
                  </div>
                </Link>
              );
            })}
        </StyledListingCardGrid>
        <br />
        <CreateListingForm submit={listingFactoryMethods.createListing} />
      </MainGrid>

      <br />
    </div>
  );
};

export default Home;
