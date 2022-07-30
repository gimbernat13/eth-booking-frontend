import React from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import { Avatar, AvatarBadge, Button } from "@chakra-ui/react";
declare let window: any;
type Props = {};

export const SiweLogin = (props: Props) => {
  let domain: any;
  let origin: any;
  let provider: any;
  let signer: any;

  const [account, setAccount] = React.useState();
  const [balance, setBalance] = React.useState<any>();

  if (typeof window !== "undefined") {
    domain = window.location.host;
    origin = window.location.origin;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }

  function createSiweMessage(address, statement) {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 5,
    });
    return message.prepareMessage();
  }

  function connectWallet() {
    provider
      .send("eth_requestAccounts", [])
      .then((res: any) => setAccount(res[0]))
      .catch(() => console.log("user rejected request"));
  }
  account &&
    provider.getBalance(account).then((result: any) => {
      setBalance(ethers.utils.formatEther(result));
    });

  async function signInWithEthereum() {
    const message = createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    console.log(await signer.signMessage(message));
  }

  return (
    <>
      {/* <Button onClick={signInWithEthereum}> Siwe </Button> */}
      {account ? (
        <Button
          // overflowX={}
          boxShadow={"md"}
          variant={"outline"}
          colorScheme="purple"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      ) : (
        <Avatar
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"
          size="md"
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      )}
    </>
  );
};
