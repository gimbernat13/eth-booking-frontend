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
    const ourFavoriteFamilyArray = [
      ["Homer", "Homer Simpson"],
      ["Marge", "Marge Simpson"],
      ["Lisa", "Lisa Simpson"],
      ["Bart", "Bart Simpson"],
      ["Maggie", "Maggie Simpson"],
    ];

    const ourFavoriteFamilyMapPromise = ourFavoriteFamilyArray.reduce(
      ( listing) => {
        const listingContract = getListingContract(listing);
        const compareReservations = async () => {
          listingContract?.getAllReservations().then(( ) => 
           !searchState.wantedDates.some((r: string) => {
            return reservations.includes(r);
          });
          );
        
        };

        return familyAccumulatorPromise.then((family) => {
          return compareReservations(listing).then((processedlisting) => {
            family[listing[0]] = processedlisting;
            return family;
          });
        });
      },
      Promise.resolve({})
    );
    ourFavoriteFamilyMapPromise.then((family) => {
      console.log("2. Promise Reduce", family);
    });
    // const partial = await promise

    const filteredListings = listings.reduce(async (listing) => {
      const listingContract = getListingContract(await listing);
      const compareReservations = async () => {
        const reservations = await listingContract?.getAllReservations();
        return !searchState.wantedDates.some((r: string) => {
          return reservations.includes(r);
        });
      };
      return compareReservations();
    }, Promise.resolve([] as any));

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
