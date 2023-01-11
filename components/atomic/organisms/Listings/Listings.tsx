/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {Box, Heading, Spinner, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useContext} from 'react';
import styled from 'styled-components';
import {SearchContext} from '../../../../context/searchContext';
import {ListingCard} from '../../molecules/ListingCard/ListingCard';
import {useListingContract} from '../../../../hooks/useContract';
import useGetListings from '../../../../hooks/useGetListings';

type Listings = {
  listings: string[];
};
const StyledListingCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  width: 100%;
`;
export const Listings = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {state: searchState} = useContext(SearchContext);
  const [availableListings, setAvailableListings] = React.useState<string[]>(
      [],
  );
  const listings = useGetListings();
  React.useEffect(() => {
    // filterListings();
  }, []);

  const filterListings = async () => {
    const addresses: string[] = [];
    setIsLoading(true);

    for (const item of Object.entries(listings) as Array<[string, string]>) {
      const listingContract = useListingContract(item[1]);
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
  };

  React.useEffect(() => {
    filterListings();
  }, [searchState.wantedDates, listings]);

  return (
    <Box padding={{base: '3rem', md: '4rem  8rem'}}>
      <Heading textAlign={'center'} p={'8px 0 '} as="h4" size="xl">
        Explore Listings:
      </Heading>
      <br />
      <Text fontWeight={'bold'} fontSize={'lg'}>
        Found : {availableListings.length} available for your chosen dates:{' '}
      </Text>

      <StyledListingCardGrid>
        {isLoading && <Spinner size={'lg'} />}
        {!isLoading &&
          availableListings.map((address: string, i: number) => (
            <Link key={address + i} href={`/listings/${address}`}>
              <div>
                <ListingCard key={address + i} address={address} />
              </div>
            </Link>
          ))}
      </StyledListingCardGrid>
    </Box>
  );
};
