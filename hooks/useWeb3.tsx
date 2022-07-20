import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
const LISTING_ABI = require("../eth/Listing.json");

type Props = {};
declare var window: any;

export const useWeb3 = () => {
  const [balance, setBalance] = useState<string | undefined | null >()
  const [currentAccount, setCurrentAccount] = useState<string | null>("")
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()
  const [provider, setProvider] = useState<any | undefined>()


  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })

  },[currentAccount])

  const onClickConnect = () => {
    console.log("conencting")
    //client side code
    if(!window.ethereum) {
      console.log("please install MetaMask")
      return
    }
   
    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(currentAccount)
    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", [])
    .then((accounts)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch((e)=>console.log(e))
  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setBalance(null)
    setCurrentAccount(null)
  }

  return { currentAccount , onClickConnect, onClickDisconnect  , balance, provider};
};
