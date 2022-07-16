import React from "react";
import styled from "styled-components";
import house from "./house.webp";
import { Text } from '@chakra-ui/react'
const StyledListingCardGrid = styled.div`
  display: grid;
`;
const StyledListingCard = styled.div`
  font-size: 1.2em;
  border-radius: 1rem;
  padding: 1rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;
const StyledListingCardImage = styled.div`
  border-radius: 1rem;
  height: 300px;
  width: 300px;
  background-color: #ff00004a;
  background-size: cover;
  background-image: url(https://amazingarchitecture.com/storage/files/1/architecture-firms/houses-tulum/caplan-house/01-caplan-house-houses-tulum-israel-pacheco.jpg);

  &:hover {
  }
`;
type Props = { address: string };
export const ListingCard = ({ address }: Props) => {
  return (
    <StyledListingCard>
      <StyledListingCardImage></StyledListingCardImage>
      <Text>
        Casa para negros
      </Text>
      <Text >
        A 782km de Distancia
      </Text>
      <Text >
        October 1st to October 19th
      </Text>
      <Text >756MXN / Night</Text>
      <Text >{address}</Text>

    </StyledListingCard>
  );
};
