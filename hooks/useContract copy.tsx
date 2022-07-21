import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
declare let window: any;

type Props = {
  address: string;
  abi: string;
};

export const useContract = (props : Props) => {
  console.log("nigger"  , props);
  
  const [z, setContract] = useState({
    addres: "",
    abi: "",
  });
  const LISTING_FACTORY_ABI = [
    // Some details about the token
    "function getListings() view returns (address[])",
    "function createListing(uint, string , string)",
  ];

  useEffect(() => {
    if (typeof window !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("eth", window.ethereum);
      console.log(signer ? "has signer" : "no signer");
      console.log(provider ? "has provider" : "no provider");
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        LISTING_FACTORY_ABI,
        signer
      );
    }
  }, []);
  return z;
};
