import { Typography } from "@ensdomains/thorin";
import React from "react";
import styled from "styled-components";
import house from "./house.webp";
type Props = {};
const StyledListingCardGrid = styled.div`
  display: grid;
`;
const StyledListingCard = styled.div`
  font-size: 1.2em;
  border-radius: 1rem;
  padding: 1rem;
`;
const StyledListingCardImage = styled.div`
  border-radius: 1rem;
  height: 300px;
  width: 300px;
  background-color: #ff00004a;
  background-size: cover;
  background-image: url(https://amazingarchitecture.com/storage/files/1/architecture-firms/houses-tulum/caplan-house/01-caplan-house-houses-tulum-israel-pacheco.jpg);
  transition: all 0.2s;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: translateY(-2px);
  }
`;

export const ListingCard = (props: Props) => {
  return (
    <StyledListingCard>
      <StyledListingCardImage></StyledListingCardImage>
      <Typography size="small" weight="semibold">
        Casa para negros
      </Typography>
      <Typography size="small" weight="light">
        A 782km de Distancia
      </Typography>
      <Typography size="small" weight="light">
        October 1st to October 19th
      </Typography>
      <Typography size="small">756MXN / Night</Typography>
    </StyledListingCard>
  );
};
