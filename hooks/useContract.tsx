import { Provider, useEffect, useState } from "react";
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
  // const [contract, setContract] = useState<Contract>();

  // useEffect(() => {

  // }, []);
  const provider = getLibrary();
  const contract = new ethers.Contract(addressOrAddressMap, ABI, provider);
  // setContract(contract);

  return contract;
}

export const getListingContract = (address: string) => {
  return useContract(address, listing.abi);
};
export const getListingFactoryContract = () => {
  return useContract(listingFactory.address, listingFactory.abi);
};
