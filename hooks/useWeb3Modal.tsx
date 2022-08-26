import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { networkParams } from "../components/atomic/organisms/Web3Modal/networks";
import { toHex } from "../components/atomic/organisms/Web3Modal/utils";

import Web3Modal from "web3modal";
import { providerOptions } from "../components/atomic/organisms/Web3Modal/providerOptions";

type Props = {};

export const useWeb3Modal = () => {
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [signature, setSignature] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [chainId, setChainId] = useState<any>();
  const [network, setNetwork] = useState<any>();
  const [message, setMessage] = useState<any>("");
  const [signedMessage, setSignedMessage] = useState<any>("");
  const [verified, setVerified] = useState<any>();

  const [web3State, setWeb3State] = useState<any>({
    provider: null,
    library: null,
    account: null,
    signature: null,
    error: null,
    chainId: null,
    network: null,
    message: null,
    signedMessage: null,
    verified: null,
  });
  let web3Modal: any = null;

  if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
  }

  const connectWallet = async () => {
    try {
      const provider = await web3Modal?.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount(null);
    setChainId(null);
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal?.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return {
    provider,
    library,
    account,
    signature,
    error,
    chainId,
    network,
    message,
    signedMessage,
    verified,
    switchNetwork,
    verifyMessage,
    signMessage,
    handleInput,
    handleNetwork,
    connectWallet,
    disconnect,
  };
};
