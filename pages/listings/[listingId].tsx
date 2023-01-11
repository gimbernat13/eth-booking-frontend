/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
import styles from '../../styles/Home.module.css';
import {
  Text,
  Heading,
  Box,
  Tag,
  Spacer,
  useToast,
  Grid,
} from '@chakra-ui/react';
import LISTING from '../../eth/Listing.json';
import {useRouter} from 'next/router';
import {ListingOverview} from '../../components/atomic/molecules/ListingOverview/ListingOverview';
import {ListingFeatures} from '../../components/atomic/molecules/ListingFeatures/ListingFeatures';
import {CreateReservationForm} from '../../components/atomic/molecules/CreateReservationForm/CreateReservationForm';
import {useContract, useProvider} from 'wagmi';
declare let window: any;

// interface ListingDataProps {
//   title: string;
//   description: string;
//   cost: number;
// }
const Listing = () => {
  const [reservations, setReservations] = React.useState<any>([]);
  const [contractSigner, setContractSigner] = React.useState<any>();
  // eslint-disable-next-line no-unused-vars
  const [success, setSucess] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  // FIXME: FIX ANY TYPES
  const [listingData, setListingData] = React.useState<any>({
    title: '',
    description: '',
    cost: 0,
  });

  const [costPerDay, setCostPerDay] = React.useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    listingMethods.getListingData();
    listingMethods.getReservations();
  }, []);

  const provider = useProvider();

  const listingContract = useContract({
    address: router.query.listingId ? router.query.listingId.toString() : '',
    abi: LISTING.abi,
    signerOrProvider: contractSigner ? contractSigner : provider,
  });

  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setContractSigner(signer);
    }
  }, []);

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
      setisLoading(true);
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
          listingMethods.getListingData();
          setisLoading(true);
        } catch (error:any) {
          console.log(error);
        }
      }
    },
  };
  React.useEffect(() => {
    provider.once('block', () => {
      listingContract?.on('CreateReservation', (event: any) => {
        console.log('event ', event);
        toast({
          title: 'Reservation created.',
          description: `Enjoy your trip`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
        setisLoading(false);
        // setisLoading(false);

        setSucess(true);
        listingMethods.getReservations();
      });
    });

    return () => {
      provider?.removeAllListeners();
    };
  }, ['']); // Add listingFactoryContract as a dependency prevent initial render

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box p="4rem  8rem">
        {listingData && (
          <div className={styles.container}>
            <Heading>{listingData[0] && listingData[0]}</Heading>
            <Text>{listingData[1] && listingData[1]} </Text>
            <Box
              mr={'6'}
              display={'inline-block'}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              width={'100%'}
              height={'50vh'}
              // border={'1px solid gray'}
              backgroundSize="cover"
              backgroundImage="https://www.contemporist.com/wp-content/uploads/2022/08/modern-house-architecture-020822-806-01.jpg"
              boxShadow={'rgb(0 0 0 / 12%) 0px 6px 16px'}
            ></Box>
            <Spacer height={'10px'} />
            {reservations.length > 1 ? (
              <Tag size={'lg'} colorScheme="purple">
                {reservations.length} dates booked in {currentYear}
              </Tag>
            ) : (
              <Tag size={'lg'} colorScheme="green">
                Be the first one to Book this property{' '}
              </Tag>
            )}
            <Grid alignItems={'center'} templateColumns={{md: '3fr 2fr'}}>
              <div>
                <Heading> {listingData.cost}</Heading>
                <ListingOverview />
                <ListingFeatures />
              </div>

              <div className="right">
                {/* <Text>Price per night: {ethers.BigNumber.from(listingData[1]).toNumber()} Eth</Text> */}
                <div>
                  <CreateReservationForm
                    isLoading={isLoading}
                    reservations={reservations}
                    submit={listingMethods.createReservation}
                  />
                </div>
              </div>
            </Grid>
          </div>
        )}
      </Box>
    </>
  );
};

export default Listing;
