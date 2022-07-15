import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

type Props = {};
declare var window: any;

export const useWeb3 = () => {
  const [isConnected, setIsConnected] = React.useState(false);

  const [provider, setProvider] = useState({});

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  // const login = async () => {
  //   await provider.send("eth_requestAccounts", []);
  // };

  // const signer = provider.getSigner();

  return { isConnected, provider };
};
