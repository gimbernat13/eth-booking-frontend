import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import { ListingCard } from "../components/ListingCard/ListingCard";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Heading } from "@chakra-ui/react";
import { getListingFactoryContract } from "../hooks/useContract";
import { CreateListingModal } from "../components/atomic/organisms/CreateListingModal/CreateListingModal";
import { HeroSection } from "../components/atomic/organisms/HeroSection/HeroSection";
import { Listings } from "../components/atomic/organisms/Listings/Listings";

declare let window: any;

const MainGrid = styled.div`
  /* display: grid;
  grid-template-columns: auto; */
`;

const Home: NextPage = () => {
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
          {listings && <Listings listings={listings} />}

          <br />

          <CreateListingModal submit={listingFactoryMethods.createListing} />
        </MainGrid>
        <br />
      </div>
    </>
  );
};

export default Home;
