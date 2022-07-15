import React from "react";
import { ethers } from "ethers";
import listingAbi from "../../artifacts/contracts/Appointment.sol";
import { useWeb3 } from "./useWeb3";
const LISTING_ABI = require("../eth/Listing.json");

type Props = {};

export const useListingContract = () => {
  // const MyContract = await ethers.getContractFactory("Listing");
  // const contract = await MyContract.attach(
  //   "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" // The deployed contract address
  // );

  // Now you can call functions of the contract

  // You can also use an ENS name for the contract address
  const daiAddress = "dai.tokens.ethers.eth";
  const { provider } = useWeb3();
  // The Contract object
  const contract = new ethers.Contract(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    LISTING_ABI,
    provider
  );
  return contract;
};
