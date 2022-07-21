import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { useActiveWeb3 } from "./useActiveWeb3";

interface type {
  contract : Contract
}
declare let window: any;

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string,
  ABI: any,
  provider : any,
  signer: any
): Contract | null | undefined {
  const contract = new ethers.Contract(
    addressOrAddressMap,
    ABI,
    signer
  );

  return contract; 
}
