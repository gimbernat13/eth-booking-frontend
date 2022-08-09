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

const Home: NextPage = (props: any) => {
  const { data: listings, methods: listingFactoryMethods } = props;
  console.log("props are ", props);
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
