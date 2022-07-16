import { Button, Card, Heading, Profile, Typography } from "@ensdomains/thorin";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import styled from "styled-components";
import { ListingCard } from "../components/ListingCard/ListingCard";
import { useWeb3 } from "../hooks/useWeb3";
import styles from "../styles/Home.module.css";
declare let window: any;
const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Home: NextPage = () => {
  const { provider } = useWeb3();
  const [reservations, setReservations] = React.useState<any>();

  console.log("reservations ", reservations && reservations);
  const shitAbi = [
    // Some details about the token
    "function getAllReservations() view returns (uint256[])",
    "function checkAvailability(uint256) public view returns (bool)",
  ];

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const listingContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      shitAbi,
      provider
    );

    const getReservations = async () => {
      const response = await listingContract.getAllReservations();
      setReservations(response);
      console.log("contracft ", listingContract);
      console.log("response", response);
    };
    getReservations();

    //called only once
  }, []);

  return (
    <div className={styles.container}>
      <StyledListingCardGrid>
        {reservations &&
          reservations.map((reservation: any) => {
           return  <ListingCard />;
          })}
      </StyledListingCardGrid>

      {/* <Typography>The new way to travel, bitches love it...</Typography> */}

      {/* <Button variant="action">Action</Button>

      <Card>
        <Heading>Hello World</Heading>
        <Typography>The quick brown fox…</Typography>
      </Card> */}
    </div>
  );
};

export default Home;
