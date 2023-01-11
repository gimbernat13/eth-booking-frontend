import {useEffect, useState} from 'react';
import {useContract, useProvider} from 'wagmi';
import listingFactory from '../eth/ListingFactory.json';

const useGetListings = () => {
  const [listings, setListings] = useState<string[]>([]);
  const provider = useProvider();
  const listingFactoryContract = useContract({
    address: listingFactory.address,
    abi: listingFactory.abi,
    signerOrProvider: provider,
  });
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await listingFactoryContract?.getListings();
        setListings(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, [provider]);

  return listings;
};

export default useGetListings;
