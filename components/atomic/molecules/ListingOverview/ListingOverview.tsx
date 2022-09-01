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
        style={{ borderRadius: "100%", height: "70px" }}
        src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"
      />
    </StyledFlexProfile>
  );
};
