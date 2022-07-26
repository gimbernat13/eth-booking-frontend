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
import listingContract from "../../eth/Listing.json";

import Image from "next/image";
import { useRouter } from "next/router";
import { useContract } from "../../hooks/useContract";
import { ListingOverview } from "../../components/atomic/molecules/ListingOverview/ListingOverview";
import { ListingPhotoGrid } from "../../components/atomic/molecules/ListingPhotoGrid/ListingPhotoGrid";
import { ListingFeatures } from "../../components/atomic/molecules/ListingFeatures/ListingFeatures";
import { CreateReservationForm } from "../../components/atomic/molecules/CreateReservationForm/CreateReservationForm";

type Props = {};

const StyledInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5rem;
`;

declare let window: any;

interface ListingDataProps {
  title: string;
  description: string;
  cost: number;
}
const Listing = (props: Props) => {
  const [reservations, setReservations] = React.useState<any>();
  const [listingData, setListingData] = React.useState<ListingDataProps>({
    title: "",
    description: "",
    cost: 0,
  });

  const [startDate, setStartDate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);

  const [costPerDay, setCostPerDay] = React.useState<any>(null);

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
          setCostPerDay(response[2]);
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
    async createReservation(_startDate: number, _endDate: number) {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();

        const bookedDays = Math.round(
          (_endDate / 1000 - _startDate / 1000) / 60 / 60 / 24
        );
        const costPerDayz = ethers.BigNumber.from(costPerDay).toNumber();
        const total = costPerDayz * bookedDays;

        console.log("[START DATE] ", _startDate / 1000);
        console.log("[END DATE] ", _endDate / 1000);

        console.log("[Days Booked] ", bookedDays);
        console.log("[Cost Per Day ] ", costPerDay.toNumber());
        console.log("[TOTAL] ", total);

        try {
          const createReservation = await contract?.createReservation(
            _startDate,
            bookedDays,
            // _startDate / 1000,
            // _startDate / 1000,
            {
              value: ethers.utils.parseUnits(total.toString(), "wei"),
            }
          );
          console.log("response ", createReservation);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };

  console.log("listing data ", listingData);
  return (
    <div className={styles.container}>
      <Heading>{listingData[0] && listingData[0]}</Heading>
      <Text>{listingData[1] && listingData[1]} </Text>
      <ListingPhotoGrid />
      <br />

      <StyledInfoGrid>
        <div>
          <Heading> {listingData.cost}</Heading>
          {/* <Heading>Price : {ethers.BigNumber.from(listingData.cost).toNumber()}</Heading> */}
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
