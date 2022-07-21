import { ethers } from "ethers";
import React, { useEffect } from "react";

type Props = {};
declare let window: any;

export const useActiveWeb3 = (props: Props) => {
  const [provider, setProvider] = React.useState<any>();
  const [signer, setSigner] = React.useState<any>();

  useEffect(() => {
    if (typeof window !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider)
      setSigner(signer)
    }
  }, []);
  return {
    provider,
    signer,
  };
};
