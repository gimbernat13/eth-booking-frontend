import { ethers } from "ethers";
declare var window: any;

export const getLibrary = () => {
  let provider;
  let signer;
  if (typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  return signer;
};
