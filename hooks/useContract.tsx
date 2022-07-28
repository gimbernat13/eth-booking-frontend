import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { useActiveWeb3 } from "./useActiveWeb3";
import { getLibrary } from "../utils/getLibrary";
import listingFactory from "../eth/ListingFactory.json";
import listing from "../eth/Listing.json";

interface type {
  contract: Contract;
}
declare let window: any;

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string,
  ABI: any
): Contract | null | undefined {
  console.log("library", getLibrary());
  const contract = new ethers.Contract(addressOrAddressMap, ABI, getLibrary());

  return contract;
}

export const useListingContract = (address: string) => {
  return useContract(address, listing.abi);
};
