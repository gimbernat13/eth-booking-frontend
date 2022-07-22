import { Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

type Props = {};
const StyledFlexProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const ListingOverview = (props: Props) => {
  return (
    <StyledFlexProfile>
      <div>
        <Text as={"h2"}>Host: El Cara de Verga</Text>
        <Text fontWeight={"500"}>
          4 Guests - 1 Room - 2 Beds - Free Marijuana
        </Text>
      </div>
      <img
        style={{ borderRadius: "50%", height: "70px" }}
        src="https://bit.ly/sage-adebayo"
      />
    </StyledFlexProfile>
  );
};
