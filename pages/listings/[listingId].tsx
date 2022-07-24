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
import {
  DateRange,
  DateRangePicker,
} from "../../components/atomic/molecules/DateRangePicker/DateRangePicker";
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
    async createReservation(startDate: number, endDate: number) {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();

        const range = Math.round((endDate - startDate) / 60 / 60 / 24);
        const costPerDayz = ethers.BigNumber.from(costPerDay).toNumber();
        const total = (costPerDayz * range) / 10000;

        try {
          console.log("[Total] ", total);
          console.log("[start date ] ", startDate);
          console.log("[end date ] ", endDate);

          // const response = await contract?.createReservation(
          //   startDate,
          //   endDate,
          //   { value: ethers.utils.parseUnits(total.toString(), "wei") }
          // );

          const createReservation = await contract?.createReservation(
            1658421358,
            1658879885,
            {
              value: ethers.utils.parseUnits("20", "wei"),
            }
          );

          const mappedShit = createReservation.map((res: any) => {
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

  console.log("listing data ", listingData);

  return (
    <div className={styles.container}>
      <Heading>{listingData && listingData[1]}</Heading>
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
          <DateRange
            dates={{
              startDate,
              setStartDate,
              endDate,
              setEndDate,
            }}
            submit={listingFactoryMethods.createReservation}
          />
          {/* <CreateReservationForm
            submit={listingFactoryMethods.createReservation}
          /> */}
        </div>
      </StyledInfoGrid>
    </div>
  );
};
export default Listing;
