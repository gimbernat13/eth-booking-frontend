import React from "react";
import { getListingContract } from "../../../../hooks/useContract";
declare let window: any;

type Props = {
  listings: string[];
  wantedDates: string[];
};

export const Listings = ({ listings, wantedDates }: Props) => {
  const wantedDates1 = [
    "2022-08-03",
    "2022-08-04",
    "2022-08-05",
    "2022-08-06",
    "2022-08-07",
    "2022-08-08",
    "2022-08-09",
    "2022-08-10",
    "2022-08-11",
    "2022-08-12",
  ];

  const reservations1 = ["2022-08-10", "2022-08-11", "2022-08-12"];
  const reservations2 = ["2023-08-10", "2023-08-11", "2023-08-12"];

  const listings1 = [
    "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5",
    "0x856e4424f806D16E8CBC702B3c0F2ede5468eae8",
  ];
  console.log("[LISTINGS]  ", listings);
  //   const listingContract = getListingContract();

  listings.forEach((address) => {
    const listingContract = getListingContract(address);
    const getAllReservations = async () => {
      try {
        const response = await listingContract?.getAllReservations();
        console.log("Reservations   :", response);

        return response;
      } catch (error) {
        console.log(error);
      }
    };
    getAllReservations();

    const filterListings = () => {
      listings1.filter(
        () => !wantedDates1.some((r) => reservations2.includes(r))
      );
    };

  });
  return <div></div>;
};
