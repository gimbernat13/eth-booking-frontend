import React from "react";

type Props = { submit: any };
import { Text, Wrap, WrapItem, Box, Button, Input } from "@chakra-ui/react";

export const CreateListingForm = ({ submit }: Props) => {
  return (
    <Box
      p="6"
      maxW={"sm"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={"rgb(0 0 0 / 12%) 0px 6px 16px"}
    >
      <Text fontWeight={"600"}>Create a new Listing</Text>
      <Input m={"5px 0"} width={"100%"} placeholder="Property Name" />
      <Input m={"5px 0"} placeholder="Property Description" />
      <Input m={"5px 0"} width={"100%"} placeholder="Cost Per Night" />
      <Button
        w={"100%"}
        // isLoading
        loadingText="Submitting"
        colorScheme="purple"
        variant="outline"
        onClick={submit}
      >
        Submit
      </Button>
    </Box>
  );
};
