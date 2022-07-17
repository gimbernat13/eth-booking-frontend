import React from "react";

type Props = { submit: any };
import {
  Text,
  Wrap,
  WrapItem,
  Divider,
  Center,
  Box,
  Badge,
  Heading,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";

export const CreateListingForm = ({ submit }: Props) => {
  return (
    <Box
      p="6"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={"rgb(0 0 0 / 12%) 0px 6px 16px"}
    >
      <Wrap>
        <div>
          <WrapItem>
            <Text fontWeight={"600"}>Create a new Listing</Text>
          </WrapItem>

          <Button
            width={"100%"}
            // isLoading
            loadingText="Submitting"
            colorScheme="purple"
            variant="outline"
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      </Wrap>
    </Box>
  );
};
