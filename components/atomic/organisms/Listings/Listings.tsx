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

  const filterListings = async () => {
    console.log("wanted dates ", searchState.wantedDates);
    console.log("listings dates ", listings);

    setIsLoading(true);
    const addresses: string[] = [];
    listings.forEach((address) => {
      const listingContract = getListingContract(address);
      const getAllReservations = async () => {
        try {
          const reservations = await listingContract?.getAllReservations();
          console.log("reservations are ", reservations);
          if (
            !searchState.wantedDates.some((r: string) => {
              console.log("reservation-- ", r);
              console.log("is included ", reservations.includes(r));
              return reservations.includes(r);
            })
          ) {
            setIsLoading(false);
            console.log("pushed address", address);
            addresses.push(address);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getAllReservations();
    });
    console.log("available addresses are ", addresses);
    setAvailableListings(addresses);
  };

  React.useEffect(() => {
    filterListings();
  }, [searchState.wantedDates]);

  return (
    <StyledListingCardGrid>
      {!isLoading &&
        availableListings.map((address: string, i: number) => (
          <Link key={address + i} href={`/listings/${address}`}>
            <div>
              <ListingCard key={address + i} address={address} />
            </div>
          </Link>
        ))}
    </StyledListingCardGrid>
  );
};
