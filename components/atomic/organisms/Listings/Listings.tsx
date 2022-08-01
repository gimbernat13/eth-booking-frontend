import React from "react";
import styled from "styled-components";
import { getListingContract } from "../../../../hooks/useContract";
import { ListingCard } from "../../../ListingCard/ListingCard";
declare let window: any;
const wantedDates1 = [
  "2022-08-03",
  "2022-08-04",
  "2022-08-05",
  "2022-08-06",
  "2022-08-07",
  "2022-08-08",
  "2022-08-09",
  "2022-08-10",
  "2022-08-11",
  "2022-08-12",
];

const reservations1 = ["2022-08-10", "2022-08-11", "2022-08-12"];
const reservations2 = ["2023-08-10", "2023-08-11", "2023-08-12"];

type Props = {
  listings: string[];
  wantedDates?: string[];
};
const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;

export const Listings = ({ listings, wantedDates }: Props) => {
  const [availableListings, setAvailableListings] = React.useState<any>([]);

  console.log("[LISTINGS]  ", listings);

  const showAvailableListings = async () => {
    const addresses: string[] = [];
    listings.forEach((address) => {
      const listingContract = getListingContract(address);
      const getAllReservations = async () => {
        try {
          const reservations = await listingContract?.getAllReservations();
          console.log(reservations);
          if (!wantedDates1.some((r) => reservations.includes(r))) {
            console.log("there is one address ,", address);
            setAvailableListings((prevState: any) => [...prevState, address]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getAllReservations();
    });

    setAvailableListings(addresses);
  };

  React.useEffect(() => {
    showAvailableListings();
  }, []);

  console.log("avialable listings ", availableListings);

  return (
    <StyledListingCardGrid>
      {availableListings.map((address: string) => (
        <ListingCard key={address} address={address} />
      ))}
    </StyledListingCardGrid>
  );
};
