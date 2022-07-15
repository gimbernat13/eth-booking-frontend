import { Button, Card, Heading, Profile, Typography } from "@ensdomains/thorin";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { ListingCard } from "../components/ListingCard/ListingCard";
import styles from "../styles/Home.module.css";

const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <StyledListingCardGrid>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
        <ListingCard></ListingCard>
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
