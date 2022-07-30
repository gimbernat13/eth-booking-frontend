import { Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import styles from "../../../../styles/Home.module.css";
import { SearchListingsForm } from "../../molecules/SearchListingsForm/SearchListingsForm";
import { CreateListingModal } from "../CreateListingModal/CreateListingModal";

type Props = { submit: any };
const StyledHero = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 1fr;
  gap: 2rem;
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
const Content = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 3fr 1fr;
  /* align-items: center; */
  position: relative;
  z-index: 1;
  transition: all 0.4s;
`;
const Overlay = styled.div`
  opacity: 0;

  position: absolute;
  height: 100%;
  width: 100%;
  background: #00000020;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: var(--border-radius);
`;

const FeaturedListing = styled.div`
  border-radius: var(--border-radius);
  height: 500px;
  width: 500px;
  background-color: salmon;
  background-image: url(https://static.dezeen.com/uploads/2022/04/sakinaw-lake-house-canada-woven-architecture_dezeen_2364_col_15.jpg);
  background-size: cover;
  /* display: grid; */
  color: white;
  padding: 2rem;
  position: relative;
  &:hover ${Content}, ${Overlay} {
    opacity: 1;
  }
  &:hover ${Overlay} {
    background: #00000075;
  }
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
`;

export const HeroSection = ({ submit }: Props) => {
  return (
    <div className={styles.container}>
      <StyledHero>
        <div className="left">
          <Heading fontSize={"3em"}>Decentralized Travel</Heading>
          <Heading fontSize={"5em"}>Book, Travel, Earn Rewards</Heading>
          <Button mr={6} mt={6} colorScheme={"purple"}>
            Explore Properties
          </Button>
          <CreateListingModal submit={submit} />
        </div>
        <div className="right">
          <FeaturedListing>
            <Overlay />
            <Content>
              <div>
                <Heading fontWeight={"semibold"} mb={"5px"} size={"xl"}>
                  Casa las putas
                </Heading>
                {/* <Text letterSpacing={"tight"} w={"70%"}>
                  An Incredible paradise for prostitutes Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Mollitia, assumenda?{" "}
                </Text> */}
              </div>

              <Bottom>
                <div>
                  <Heading fontWeight={"semibold"} size={"md"}>
                    Guanajuato
                  </Heading>
                  <Text>3 Bedrooms - 4 Beds </Text>
                </div>
                <Heading fontWeight={"semibold"} mb={"5px"} size={"lg"}>
                  33 ETH / Night
                </Heading>{" "}
              </Bottom>
            </Content>
          </FeaturedListing>
        </div>
      </StyledHero>
    </div>
  );
};
