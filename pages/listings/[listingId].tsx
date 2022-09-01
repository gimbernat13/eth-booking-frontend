import { ethers } from "ethers";
import React, { useEffect } from "react";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";
import { Text, Divider, Heading, Box } from "@chakra-ui/react";

import listingContract from "../../eth/Listing.json";

import { useRouter } from "next/router";
import { useContract, getListingContract } from "../../hooks/useContract";
import { ListingOverview } from "../../components/atomic/molecules/ListingOverview/ListingOverview";
import { ListingPhotoGrid } from "../../components/atomic/molecules/ListingPhotoGrid/ListingPhotoGrid";
import { ListingFeatures } from "../../components/atomic/molecules/ListingFeatures/ListingFeatures";
import { CreateReservationForm } from "../../components/atomic/molecules/CreateReservationForm/CreateReservationForm";

type Props = {};
declare let window: any;

const StyledInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5rem;
`;

interface ListingDataProps {
  title: string;
  description: string;
  cost: number;
}
const Listing = (props: Props) => {
  const [reservations, setReservations] = React.useState<any>([]);
  const [listingData, setListingData] = React.useState<ListingDataProps>({
    title: "",
    description: "",
    cost: 0,
  });

  const [startDate, setStartDate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);

  const [costPerDay, setCostPerDay] = React.useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    listingFactoryMethods.getListingData();
    listingFactoryMethods.getReservations();
  }, []);

  // FIXME: ABSTRACT TO HOOK
  async function initListingFactory() {
    if (typeof window == "undefined") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = useContract(
      router.query.listingId ? router.query.listingId.toString() : "",
      listingContract.abi
    );

    return contract;
  }

  const contract = getListingContract(router.query.listingId);

  // =============== LISTING ==================================
  const listingFactoryMethods = {
    async getListingData() {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          const response = await contract?.getListingData();
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
          const response = await contract?.getAllReservations();

          setReservations(response);
        } catch (error) {
          console.log("Ftetch error", error);
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
        try {
          const createReservation = await contract?.createReservation(
            1662784567,
            bookedDays,
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

  return (
    <div className={styles.container}>
      <br />
      <br />
      <br />

      <Heading>{listingData[0] && listingData[0]}</Heading>
      <Text>{listingData[1] && listingData[1]} </Text>
      <Box
        mr={"6"}
        display={"inline-block"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        maxHeight={"50vh"}
        border={"1px solid gray"}
        // boxShadow={"rgb(0 0 0 / 12%) 0px 6px 16px"}
      >
        <img
          style={{ objectFit: "cover" }}
          src="https://a0.muscache.com/im/pictures/miso/Hosting-34224785/original/25e8db0a-6c58-4a2c-8764-04a65765ee9e.jpeg?im_w=1200"
          alt=""
        />
      </Box>
      {/* <ListingPhotoGrid /> */}
      <br />
      {reservations?.map((res: string) => (
        <Box
          key={res}
          p="6"
          mr={"6"}
          maxW="sm"
          display={"inline-block"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          border={"1px solid gray"}
          // boxShadow={"rgb(0 0 0 / 12%) 0px 6px 16px"}
        >
          <div key={res}>{res}</div>
        </Box>
      ))}

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
            reservations={reservations}
            submit={listingFactoryMethods.createReservation}
          />
        </div>
      </StyledInfoGrid>
    </div>
  );
};
export default Listing;
