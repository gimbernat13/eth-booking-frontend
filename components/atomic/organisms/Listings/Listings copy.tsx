import Link from "next/link";
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
  const addresses: string[] = [];

  const filterListings = async () => {
    console.log("All Listings ", listings);

    setIsLoading(true);

    //Return a new Array (filter ) that chooses only items that have no reservations
    // Create submethod for checking availability
    const filteredListings = listings.filter((listing) => {
      const listingContract = getListingContract(listing);
      const compareReservations = async () => {
        try {
          const reservations = await listingContract?.getAllReservations();
          // Compares Wanted Dates and Listing reservations
          console.log(
            "yeah nigga",
            !searchState.wantedDates.some((r: string) => {
              return reservations.includes(r);
            })
          );
          return !searchState.wantedDates.some((r: string) => {
            return reservations.includes(r);
          });
        } catch (error) {
          console.log(error);
        }
      };

      compareReservations();
    });

    listings.forEach((address) => {
      const listingContract = getListingContract(address);
      const compareReservations = async () => {
        try {
          const reservations = await listingContract?.getAllReservations();
          if (
            !searchState.wantedDates.some((r: string) => {
              return reservations.includes(r);
            })
          ) {
            setIsLoading(false);
            addresses.push(address);
          }
        } catch (error) {
          console.log(error);
        }
      };

      compareReservations();
    });
    setAvailableListings(addresses);
  };

  React.useEffect(() => {
    filterListings();
  }, [searchState]);

  console.log("available ", availableListings);
  return (
    <StyledListingCardGrid>
      {!isLoading &&
        availableListings.map((address: string, i: number) => (
          <h1 key={address + i}>{i} amo la mierda negra</h1>
        ))}
    </StyledListingCardGrid>
  );
};
{
  /* <Link key={address + i} href={`/listings/${address}`}>
<div>
  <ListingCard key={address + i} address={address} />
</div>
</Link> */
}
