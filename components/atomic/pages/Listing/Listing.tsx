/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {Text, Box, useToast, Heading, Grid, Tag} from '@chakra-ui/react';
import {useState} from 'react';
import listing from '../../../../eth/Listing.json';
import React from 'react';
import {useContract} from 'wagmi';
import {ethers} from 'ethers';
import {CreateReservationForm} from '../../molecules/CreateReservationForm/CreateReservationForm';
import ListingCarousel from '../../molecules/ListingCarousel/ListingCarousel';
import {ListingFeatures} from '../../molecules/ListingFeatures/ListingFeatures';
import {ListingOverview} from '../../molecules/ListingOverview/ListingOverview';
const currentYear = new Date().getFullYear();

declare let window: any;

interface ListingDataProps {
  title: string;
  description: string;
  cost: number;
}

type Props = {
  address: string;
};
export const Listing = ({address}: Props) => {
  if (typeof window !== 'undefined') {
    const [success, setSucess] = useState(false);
    const [isListingLoading, setIsListingLoading] = useState(false);
    const [listingData, setListingData] = React.useState<any>({
      title: '',
      description: '',
      cost: 0,
    });

    // FIXME: CORRECT ANY TYPES
    const [reservations, setReservations] = React.useState<any>([]);
    const [costPerDay, setCostPerDay] = React.useState<any>(null);
    const toast = useToast();
    // const [isLoading, setIsLoading] = useState(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // window.ethereum.enable();
    const signer = provider.getSigner();

    const listingContract = useContract({
      address: address,
      abi: listing.abi,
      signerOrProvider: signer,
    });

    React.useEffect(() => {
      listingMethods.getListingData();
      listingMethods.getReservations();
    }, []);

    React.useEffect(() => {
      provider.once('block', () => {
        listingContract?.on('CreateReservation', (event: any) => {
          toast({
            title: 'Reservation created.',
            description: `${event} has ben created.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          setIsListingLoading(false);
          setSucess(true);
        });
      });

      return () => {
        provider?.removeAllListeners();
      };
    }, [listingContract]); // Add listingContract as a dependency

    const listingMethods = {
      async getListingData() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const response = await listingContract?.getListingData();
            setListingData(response);
            setCostPerDay(response[2]);
          } catch (error:any) {
            console.log(error);
          }
        }
      },
      async getReservations() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const response = await listingContract?.getAllReservations();
            setReservations(response);
          } catch (error:any) {
            console.log('Fetch error', error);
          }
        }
      },
      async createReservation(_startDate: number, _endDate: number) {
        if (typeof window.ethereum !== 'undefined') {
          const transformedDate = _startDate / 1000;
          const bookedDays = Math.round(
              (_endDate / 1000 - _startDate / 1000) / 60 / 60 / 24,
          );
          const costPerDayz = ethers.BigNumber.from(costPerDay).toNumber();
          const total = costPerDayz * bookedDays;
          try {
            const createReservation = await listingContract?.createReservation(
                transformedDate,
                bookedDays,
                {
                  value: ethers.utils.parseUnits(total.toString(), 'wei'),
                },
            );
            setIsListingLoading(true);
          } catch (error:any) {
            console.log(error);
          }
        }
      },
    };

    return (
      <>
        <Box p="4rem  8rem">
          {listingData && (
            <Box>
              <Grid
                // pt="8rem"
                alignItems={'center'}
                templateColumns={{md: '3fr 3fr'}}
                gap="3rem"
              >
                <ListingCarousel />
                <Box>
                  <Heading>{listingData[0] && listingData[0]}</Heading>
                  <Text>{listingData[1] && listingData[1]} </Text>
                  <Heading> {listingData.cost}</Heading>
                  {reservations.length > 1 ? (
                    <Tag size={'lg'} colorScheme="purple">
                      {reservations.length} dates booked in {currentYear}
                    </Tag>
                  ) : (
                    <Tag size={'lg'} colorScheme="green">
                      Be the first one to Book this property
                    </Tag>
                  )}
                  <ListingOverview />
                  <ListingFeatures />

                  <Box className="right">
                    <CreateReservationForm
                      isLoading={isListingLoading}
                      reservations={reservations}
                      submit={listingMethods.createReservation}
                    />
                  </Box>
                </Box>
              </Grid>
            </Box>
          )}
        </Box>
      </>
    );
  } else {
    return '';
  }
};
