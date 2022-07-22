import { Wrap, WrapItem, Button, Text, Box, Input } from "@chakra-ui/react";
import {} from "framer-motion";
import React from "react";
import { DateTimePicker } from "../../molecules/DateTimePicker/DateTime";

type Props = {
  submit: () => void;
};

export const CreateReservationForm = ({ submit }: Props) => {
  return (
    <Box
      p="6"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      background={"white"}
      boxShadow={"rgb(0 0 0 / 12%) 0px 6px 16px"}
    >
      <Wrap>
        <div>
          <WrapItem>
            <Text fontWeight={"600"}>$33 Per Night</Text>
          </WrapItem>
          <WrapItem></WrapItem>
          <WrapItem>
            <Text fontWeight={"400"} fontSize={"14px"}>
              Niggaz be lovin this shit{" "}
            </Text>
          </WrapItem>
          <DateTimePicker />

          <Button
            onClick={submit}
            width={"100%"}
            // isLoading
            loadingText="Submitting"
            colorScheme="purple"
            variant="outline"
          >
            Submit
          </Button>
        </div>
      </Wrap>
    </Box>
  );
};
