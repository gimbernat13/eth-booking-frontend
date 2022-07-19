import React from "react";
import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

type Props = {};
declare var window: any;

const LISTING_FACTORY_ABI = [
  "function getListings() public view returns (string[])",
  "function createListing(string, uint) public returns (string)",
];

export const useListingFactory = () => {
  const [listings, setListings] = React.useState<any>();

  React.useEffect(() => {
    listingFactoryMethods.getListings();
  }, []);


  async function initListingFactory() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      LISTING_FACTORY_ABI,
      signer
    );
    return contract;
  }

  // =============== LISTING ==================================
  const listingFactoryMethods = {
    async getListings() {
   
      if (typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        console.log("fetching Listings ");
        const contract = await initListingFactory();
        try {
          console.log("fetching listings", await contract.getListings());
          const response = await contract.getListings();
          // setListings(response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async createListing(_newListing: string, _cost: number) {
      if (typeof window.ethereum !== "undefined") {
        const contract = await initListingFactory();
        try {
          console.log("creating listing");
          await contract.createListing(_newListing, _cost);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };
 
  return { listings, listingFactoryMethods };
};
