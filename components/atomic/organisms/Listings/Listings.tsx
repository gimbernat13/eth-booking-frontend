import React from "react";
import { getListingContract } from "../../../../hooks/useContract";
declare let window: any;

type Props = {
  listings: string[];
};

export const Listings = ({ listings }: Props) => {
  console.log("[LISTINGS]  ", listings);
  //   const listingContract = getListingContract();

  const listingMethods = {
    async checkAvailability(date: string) {
      if (typeof window.ethereum !== "undefined") {
        try {
          const response = await listingContract?.checkAvailability();
          console.log("[Is Available]", response);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };
  listings.forEach((address) => {
    const listingContract = getListingContract(address);
    const checkAvailability = async () => {
      try {
        const response = await listingContract?.checkAvailability("2022-10-13");
        console.log("[Is Booked]", address, response);
      } catch (error) {
        console.log(error);
      }
    };
    checkAvailability();
  });
  return <div></div>;
};
