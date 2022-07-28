import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import styles from "../../../../styles/Home.module.css";
import { CreateListingModal } from "../CreateListingModal/CreateListingModal";

type Props = { submit: any };
const StyledHero = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns : 60% 1fr;
  align-items: center;
  background-size: cover;
  background-repeat: none;
  /* box-shadow: 0 0 0 2000px inset #1717177e; */
  /* background-image: url("https://news.airbnb.com/wp-content/uploads/sites/4/2020/05/Airbnb-Beachfront-Greece.jpg?w=2400"); */
  h2 {
    /* color: white; */
    /* color: gray; */
  }
`;

const StyledHero1 = styled.div`
  height: 90vh;
  width: 100%;
  display: grid;
  grid-template-columns : 60% 1fr;
  align-items: center;
  background-size: cover;
  box-shadow: 0 0 0 2000px inset #1717177e;
  background-image: url("https://news.airbnb.com/wp-content/uploads/sites/4/2020/05/Airbnb-Beachfront-Greece.jpg?w=2400");
  h2 {
    color: white;
  }
`;
export const HeroSection = ({submit}: Props) => {
  return (
    <StyledHero>
      <div className={styles.container}>
        <Heading  fontSize={"3em"}>
          Decentralized Travel
        </Heading>
        <Heading  fontSize={"5em"}>
          Book, Travel, Earn Rewards
        </Heading>
        <Button mr={6} mt={6} colorScheme={"purple"}>
          Explore Properties
        </Button>
        <CreateListingModal submit={submit} />
      </div>
      <div>


      </div>
    </StyledHero>
  );
};
