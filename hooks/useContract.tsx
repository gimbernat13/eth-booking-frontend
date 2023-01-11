import {Contract, ethers} from 'ethers';
import {getLibrary} from '../utils/getLibrary';
import listingFactory from '../eth/ListingFactory.json';
import listing from '../eth/Listing.json';
import travelNFT from '../eth/TravelNFT.json';

export function useContract(
    addressOrAddressMap: string,
    ABI: any,
): Contract | null | undefined {
  const {signer} = getLibrary();
  const contract = new ethers.Contract(addressOrAddressMap, ABI, signer);
  return contract;
}

export const useListingContract = (address: string) => {
  return useContract(address, listing.abi);
};
export const useListingFactoryContract = () => {
  return useContract(listingFactory.address, listingFactory.abi);
};

export const useTravelNFTContract = () => {
  return useContract(travelNFT.address, travelNFT.abi);
};
