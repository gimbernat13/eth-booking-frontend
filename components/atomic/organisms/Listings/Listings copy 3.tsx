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
    let values = ["another", "word", "here"];
    values = await values.reduce(async (acc, v) => {
      const result = await hasFourLetters(v);
      // If our async method didn't return true, return the current list
      // *without* this new entry
      if (!result) {
        return acc;
      }
      // Otherwise add this value to the list
      return (await acc).concat(run);
    }, []);

    //Return a new Array (filter ) that chooses only items that have no reservations
    // Create submethod for checking availability

    const filteredListings = await listings.reduce(async (listing) => {
      const listingContract = getListingContract(listing);
      const compareReservations = async () => {
        const reservations = await listingContract?.getAllReservations();
        return !searchState.wantedDates.some((r: string) => {
          return reservations.includes(r);
        });
      };
      return compareReservations();
    });

    const filteredListisngs = listings.filter((listing) => {
      const listingContract = getListingContract(listing);
      const compareReservations = async () => {
        const reservations = await listingContract?.getAllReservations();
        return !searchState.wantedDates.some((r: string) => {
          return reservations.includes(r);
        });
      };
      return compareReservations();
    });

    setAvailableListings(filteredListings);
  };

  React.useEffect(() => {
    filterListings();
  }, [searchState]);
  console.log("wanted dates", searchState.wantedDates);

  console.log("all", listings);

  console.log("available", availableListings);
  return (
    <StyledListingCardGrid>
      {availableListings.map((address: string, i: number) => (
        <Link key={address + i} href={`/listings/${address}`}>
          <div>
            <ListingCard key={address + i} address={address} />
          </div>
        </Link>
      ))}
    </StyledListingCardGrid>
  );
};
