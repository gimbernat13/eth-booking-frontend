import { BigNumber, ethers } from "ethers";
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
import listingContract from "../../eth/ListingContract.json";

import Image from "next/image";
import { useRouter } from "next/router";
import { useContract } from "../../hooks/useContract";
import { ListingOverview } from "../../components/atomic/molecules/ListingOverview/ListingOverview";
import { CreateReservationForm } from "../../components/atomic/organisms/CreateReservationForm/CreateReservationForm";
import { ListingPhotoGrid } from "../../components/atomic/molecules/ListingPhotoGrid/ListingPhotoGrid";
import { ListingFeatures } from "../../components/atomic/molecules/ListingFeatures/ListingFeatures";
type Props = {};
const StyledInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5rem;
`;

declare let window: any;

const Listing = (props: Props) => {
  const [reservations, setReservations] = React.useState<any>();
  const [listingData, setListingData] = React.useState<any>();

  const router = useRouter();
  console.log("---router--- , router", router.query.listingId);

  useEffect(() => {
    listingFactoryMethods.getListingData();
    listingFactoryMethods.getReservations();
  }, []);

  // FIXME: ABSTRACT TO HOOK
  async function initListingFactory() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = useContract(
      router.query.listingId ? router.query.listingId.toString() : "",
      listingContract.abi,
      provider,
      signer
    );

    return contract;
  }

  // =============== LISTING ==================================
  const listingFactoryMethods = {
    async getListingData() {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          const response = await contract.getListingData();
          console.log("[Listing Data ]", response);
          setListingData(response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getReservations() {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          const response = await contract.getAllReservations();
          const mappedShit = response.map((res) => {
            return ethers.BigNumber.from(res).toNumber();
          });
          console.log("[Listing Reservations ]", mappedShit);

          setReservations(mappedShit);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async createReservation() {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          const response = await contract?.createReservation(
            1658421358,
            1658879885
          );
          const mappedShit = response.map((res) => {
            return ethers.BigNumber.from(res).toNumber();
          });
          console.log("[Listing Reservations ]", mappedShit);

          setReservations(mappedShit);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };

  return (
    <div className={styles.container}>
      <Heading>{listingData && listingData[1]}</Heading>
      <ListingPhotoGrid />
      <br />

      <StyledInfoGrid>
        <div>
        

          <ListingOverview />
          <Divider colorScheme={"darkTheme"} />
          <ListingFeatures />
        </div>

        <div className="right">
          <CreateReservationForm
            submit={listingFactoryMethods.createReservation}
          />
        </div>
      </StyledInfoGrid>
    </div>
  );
};
export default Listing;
