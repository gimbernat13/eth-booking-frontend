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

  const LISTING_FACTORY_ABI = [
    // Some details about the token
    "function getDeployedListings() view returns (address[])",
    "function createListing(uint, string , string)",
  ];

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    setProvider(provider);
    const listingFactoryContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      LISTING_FACTORY_ABI,
      provider
    );


    const getListings = async () => {
      try {
        const response = await listingFactoryContract.getDeployedListings();
        setListings(response);
      } catch (error) {
        console.log(error);
      }
    };
    getListings();

    const createListing = async () => {
      const response = await listingFactoryContract.createListing(
        "Putas Locas en Baja",
        "Está perron compadre...",
        33
      );
      console.log("listings ", response);
    };
  }, []);
  const signer = provider && provider.getSigner();

  const listingFactoryContract = new ethers.Contract(
    "0x818283C38087BEF95840d2E819F85a4B7f805C9A",
    LISTING_FACTORY_ABI,
    provider,
    signer
  );


  const listingFactoryContractWithSigner =
    listingFactoryContract.connect(signer);

  const createListing = async () => {
    try {
      const response = await listingFactoryContractWithSigner.createListing(
        3333,
        "Putas Locas en Baja",
        "Está perron compadre...",
        { gasLimit: 210000 }
      );
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Text as="h3">Close to your location: </Text>
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
        <CreateListingForm submit={createListing} />
      </MainGrid>

      <br />
    </div>
  );
};

export default Home;
