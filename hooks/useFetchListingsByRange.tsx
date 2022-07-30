import React from "react";
import { getListingFactoryContract } from "./useContract";

type Props = {};

export const useFetchListingsByRange = (props: Props) => {
  console.log("amo la mierda");
  const contract = getListingFactoryContract();

  const listingFactoryMethods = {
    async getListings() {
      if (typeof window.ethereum !== "undefined") {
        try {
          console.log(
            "fetching listings",
            await listingFactoryContract?.getListings()
          );
          const response = await listingFactoryContract?.getListings();
          setListings(response);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };
  return <div>useFetchListingsByRange</div>;
};
