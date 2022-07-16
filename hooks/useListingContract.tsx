// src/components/ReadERC20.tsx
import React, {useEffect, useState } from 'react';
import {Text} from '@chakra-ui/react'
import {ERC20ABI as abi} from 'abi/ERC20ABI'
import {ethers} from 'ethers'

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ReadERC20(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const [totalSupply,setTotalSupply]=useState<string>()
  const [symbol,setSymbol]= useState<string>("")

  const shitAbi = [
    // Some details about the token
    "function getAllReservations() view returns (uint256[])",
  ];
  

  useEffect( () => {
    if(!window.ethereum) return




    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const listingContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      shitAbi,
      provider
    );
    

    const getReservations = async () => {
      const response = await listingContract.getAllReservations();
      console.log()
  
    }
    getReservations()
  
    //called only once
  },[])  

  

  return (
  ""
  )
}
