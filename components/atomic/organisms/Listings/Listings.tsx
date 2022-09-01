import { Button, Skeleton, Spinner } from "@chakra-ui/react";
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
type Listings = {
  listings: string[];
};
const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;
export const Listings = ({ listings }: Props) => {
  const [availableListings, setAvailableListings] = React.useState<string[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const { state: searchState, dispatch } = useContext(SearchContext);

  const filterListings = async () => {
    let addresses: string[] = [];
    setIsLoading(true);

    for (const item of Object.entries(listings)) {
      const listingContract = getListingContract(item[1]);
      const reservations = await listingContract?.getAllReservations();
      if (
        !searchState.wantedDates.some((r: string) => {
          return reservations.includes(r);
        })
      ) {
        addresses.push(item[1]);
      }
    }
    setIsLoading(false);
    setAvailableListings(addresses);
    console.log(addresses);
  };

  React.useEffect(() => {
    filterListings();
  }, [searchState.wantedDates]);

  return (
    <>
      <h1>
        Found : {availableListings.length} available for your chosen dates:{" "}
      </h1>

      <StyledListingCardGrid>
        {isLoading && <Spinner size={"lg"} />}
        {!isLoading &&
          availableListings.map((address: string, i: number) => (
            <Link key={address + i} href={`/listings/${address}`}>
              <div>
                <ListingCard key={address + i} address={address} />
              </div>
            </Link>
          ))}
      </StyledListingCardGrid>
    </>
  );
};
