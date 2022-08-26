import {
  Button,
  Text,
  HStack,
  Avatar,
  AvatarBadge,
  Box,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { truncateAddress } from "./utils";

import { useWeb3Modal } from "../../../../hooks/useWeb3Modal";

export default function Web3ConnectModal() {
  const { account, error, connectWallet, disconnect } = useWeb3Modal();

  return (
    <>
      <HStack justifyContent="center" alignItems="center">
        <HStack justifyContent="center" alignItems="center">
          <HStack>
            {account ? (
              <Avatar
                src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"
                size="sm"
              >
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            ) : (
              // <CheckCircleIcon color="green" />
              <WarningIcon color="#cd5700" />
            )}
          </HStack>

          <Tooltip label={account} placement="right">
            <Text>{`${truncateAddress(account)}`}</Text>
          </Tooltip>

          <HStack>
            {!account ? (
              <Button colorScheme={"purple"} onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Button colorScheme={"purple"} onClick={disconnect}>
                Disconnect
              </Button>
            )}
          </HStack>
        </HStack>

        <Text>{error ? error.message : null}</Text>
      </HStack>
    </>
  );
}
