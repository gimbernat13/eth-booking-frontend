import { ethers } from "ethers";
import React, { useEffect } from "react";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";
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

import pool from "../../assets/img/swimming-pool.png";
import study from "../../assets/img/study.png";
import chimney from "../../assets/img/chimney.png";

import Image from "next/image";
type Props = {};
const StyledInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5rem;
`;
const StyledPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  height: 60vh;
  align-items: center;
  justify-content: center;
  gap: 5px;

  img {
    height: 300px;
    border-radius: var(--border-radius);
    transition: all 0.2s;
  }
`;
const StyledPhoto = styled.div`
  transition: all 0.3s;
  cursor: pointer;
  height: 100%;
  background-size: cover;
  background-image: url(https://a0.muscache.com/im/pictures/bd45cdfe-40b7-4307-b3a0-e163dea5964a.jpg?im_w=1200);
  &:hover {
    filter: brightness(0.9);
  }
`;
const StyledLargePhoto = styled(StyledPhoto)`
  grid-column: 1;
  grid-row: 1 / 3;
  height: 100%;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  background-image: url(https://destinationlesstravel.com/wp-content/uploads/2022/04/A-boat-dock-on-the-beautiful-Lake-Bacalar-Mexico.jpg.webp);
`;

const StyledTopRightPhoto = styled(StyledPhoto)`
  border-top-right-radius: var(--border-radius);
  background-color: blue;
  height: 100%;
  background-image: url(https://a0.muscache.com/im/pictures/41ad184a-fdee-4158-afa9-f971e0763ed1.jpg?im_w=1440);
`;
const StyledBottomRightPhoto = styled(StyledPhoto)`
  border-bottom-right-radius: var(--border-radius);

  background-image: url(https://a0.muscache.com/im/pictures/miso/Hosting-34224785/original/25e8db0a-6c58-4a2c-8764-04a65765ee9e.jpeg?im_w=1200);
`;

const StyledFlexProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

const StyledFlexFeature = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: 1rem 0;
  p {
    margin-left: 15px;
  }
`;

const LISTING_ABI = [
  // Some details about the token
  "function getAllReservations() view returns (uint256[])",
  "function getListingData() view returns (string, string, uint256)",
  "function checkAvailability(uint256) public view returns (bool)",
];

declare let window: any;

const Listing = (props: Props) => {
  const [reservations, setReservations] = React.useState<any>();

  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const listingContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      LISTING_ABI,
      provider
    );
    const getReservations = async () => {
      const response = await listingContract.getAllReservations();
      setReservations(response);
      console.log("response", response);
    };
    const getListingData = async () => {
      console.log("fetching")
      const response = await listingContract.getListingData();

      console.log("response", response);
    };
    getListingData();
    getReservations();
  }, []);

  return (
    <div className={styles.container}>
      <Heading>Casa Perrax</Heading>

      <StyledPhotoGrid>
        <StyledLargePhoto></StyledLargePhoto>
        <StyledPhoto></StyledPhoto>
        <StyledTopRightPhoto></StyledTopRightPhoto>
        <StyledPhoto></StyledPhoto>
        <StyledBottomRightPhoto></StyledBottomRightPhoto>
      </StyledPhotoGrid>
      <br />

      <StyledInfoGrid>
        <div>
          <StyledFlexProfile>
            <div>
              <Text as={"h2"}>Host: El Cara de Verga</Text>
              <Text fontWeight={"500"}>
                4 Guests - 1 Room - 2 Beds - Free Marijuana
              </Text>
            </div>
            <img
              style={{ borderRadius: "50%", height: "70px" }}
              src="https://bit.ly/sage-adebayo"
            />
          </StyledFlexProfile>
          <Divider colorScheme={"darkTheme"} />

          <StyledFlexFeature>
            <Wrap>
              <WrapItem>
                <Center w="30px" h="30px">
                  <Image src={pool} />
                </Center>
              </WrapItem>
            </Wrap>
            <Wrap>
              <div>
                <WrapItem>
                  <Text fontWeight={"500"}>Chimney</Text>
                </WrapItem>
                <WrapItem>
                  <Text fontWeight={"400"} fontSize={"14px"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Libero animi maxime, sint voluptatibus illum consequatur,
                    itaque incidunt optio, saepe inventore magni quas natus
                    sapiente ad dignissimos accusamus quae eaque reiciendis.
                  </Text>
                </WrapItem>
              </div>
            </Wrap>
          </StyledFlexFeature>

          <StyledFlexFeature>
            <Wrap>
              <WrapItem>
                <Center w="30px" h="30px">
                  <Image src={study} />
                </Center>
              </WrapItem>
            </Wrap>
            <Wrap>
              <div>
                <WrapItem>
                  <Text fontWeight={"500"}>A place to do Crack Cocaine</Text>
                </WrapItem>
                <WrapItem>
                  <Text fontWeight={"400"} fontSize={"14px"}>
                    Niggaz be lovin' this shit{" "}
                  </Text>
                </WrapItem>
              </div>
            </Wrap>
          </StyledFlexFeature>
          <StyledFlexFeature>
            <Wrap>
              <WrapItem>
                <Center w="30px" h="30px">
                  <Image src={chimney} />
                </Center>
              </WrapItem>
            </Wrap>
            <Wrap>
              <div>
                <WrapItem>
                  <Text fontWeight={"500"}>Chimney</Text>
                </WrapItem>
                <WrapItem>
                  <Text fontWeight={"400"} fontSize={"14px"}>
                    Niggaz be lovin' this shit{" "}
                  </Text>
                </WrapItem>
              </div>
            </Wrap>
          </StyledFlexFeature>
        </div>

        <div className="right">
          <Box
            p="6"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow={"rgb(0 0 0 / 12%) 0px 6px 16px"}
          >
            <Wrap>
              <div>
                <WrapItem>
                  <Text fontWeight={"600"}>$33 Per Night</Text>
                </WrapItem>
                <WrapItem>
                  <Text fontWeight={"400"} fontSize={"14px"}>
                    Niggaz be lovin' this shit{" "}
                  </Text>
                </WrapItem>

                <Button
                  width={"100%"}
                  // isLoading
                  loadingText="Submitting"
                  colorScheme="purple"
                  variant="outline"
                >
                  Submit
                </Button>
              </div>
            </Wrap>
          </Box>
        </div>
      </StyledInfoGrid>
    </div>
  );
};
export default Listing;
