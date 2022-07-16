
import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import { ListingCard } from "../components/ListingCard/ListingCard";
import { useWeb3 } from "../hooks/useWeb3";
import styles from "../styles/Home.module.css";
import Link from "next/link";

declare let window: any;

const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Home: NextPage = () => {
  const { provider } = useWeb3();
  const [reservations, setReservations] = React.useState<any>();
  const [listings, setListings] = React.useState<any>();

  console.log("reservations ", reservations && reservations);

  const LISTING_FACTORY_ABI = [
    // Some details about the token
    "function getDeployedListings() view returns (address[])",
    "function createListing(uint, string , string)",
  ];

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const listingFactoryContract = new ethers.Contract(
      "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      LISTING_FACTORY_ABI,
      provider
    );

    const getListings = async () => {
      const response = await listingFactoryContract.getDeployedListings();
      setListings(response);
      console.log("listings ", response);
    };
    getListings();

    const createListing = async () => {
      const response = await listingFactoryContract.createListing(
        "Putas Locas en Baja",
        33,
        "Está perron compadre..."
      );
      console.log("listings ", response);
    };
  }, []);

  return (
    <div className={styles.container}>
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

      

    
    </div>
  );
};

export default Home;
