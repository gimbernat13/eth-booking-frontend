import React, { useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../../../../context/searchContext";
import { getListingContract } from "../../../../hooks/useContract";
import { ListingCard } from "../../../ListingCard/ListingCard";
declare let window: any;

type Props = {
  listings: string[];
};
const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;

export const Listings = ({ listings }: Props) => {
  const [availableListings, setAvailableListings] = React.useState<any>([]);
  const { state: searchState, dispatch } = useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const filterListings = async () => {
    setIsLoading(true);
    const addresses: string[] = [];
    listings.forEach((address) => {
      const listingContract = getListingContract(address);
      const getAllReservations = async () => {
        try {
          const reservations = await listingContract?.getAllReservations();
          if (
            !searchState.wantedDates.some((r: string) =>
              reservations.includes(r)
            )
          ) {
            setIsLoading(false);
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
    filterListings();
  }, []);

  return (
    <StyledListingCardGrid>
      {!isLoading &&
        availableListings.map((address: string, i: number) => (
          <ListingCard key={address + i} address={address} />
        ))}
    </StyledListingCardGrid>
  );
};
