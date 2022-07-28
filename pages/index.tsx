import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import { ListingCard } from "../components/ListingCard/ListingCard";
// import { useWeb3 } from "../hooks/useWeb3";
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
  Spacer,
} from "@chakra-ui/react";
import { CreateListingForm } from "../components/atomic/molecules/CreateListingForm/CreateListingForm";

import listingFactory from "../eth/ListingFactory.json";
import { useContract, useListingFactoryContract } from "../hooks/useContract";
import { CreateListingModal } from "../components/atomic/organisms/CreateListingModal/CreateListingModal";
import { HeroSection } from "../components/atomic/organisms/HeroSection/HeroSection";

declare let window: any;

const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;
const MainGrid = styled.div`
  /* display: grid;
  grid-template-columns: auto; */
`;

const Home: NextPage = () => {
  const [provider, setProvider] = React.useState<any>();
  const [listings, setListings] = React.useState<any>();

  useEffect(() => {
    listingFactoryMethods.getListings();
  }, []);
  const listingFactoryContract = useListingFactoryContract();

  // FIXME: ABSTRACT TO HOOK

  const eventProvider = new ethers.providers.WebSocketProvider(
    "ws://localhost:8545"
  );

  // =============== LISTING ==================================
  const listingFactoryMethods = {
    async getListings() {
      if (typeof window.ethereum !== "undefined") {
        try {
          console.log(
            "fetching listings",
            await listingFactoryContract?.getListings()
          );
          const response = await listingFactoryContract?.getListings();
          setListings(response);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async createListing(title: string, description: string, cost: number) {
      // const iface = new ethers.utils.Interface(LISTING_ABI);
      console.log("fafafafa", title);
      if (typeof window.ethereum !== "undefined") {
        try {
          const response = await listingFactoryContract?.createListing(
            title,
            description,
            cost
          );
          console.log("response ", response);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };
  return (
    <>
      <HeroSection submit={listingFactoryMethods.createListing} />

      <div className={styles.container}>
        <Heading p={"8px 0 "} as="h4" size="md">
          Explore Listings:
        </Heading>{" "}
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

          <CreateListingModal submit={listingFactoryMethods.createListing} />
        </MainGrid>
        <br />
      </div>
    </>
  );
};

export default Home;
