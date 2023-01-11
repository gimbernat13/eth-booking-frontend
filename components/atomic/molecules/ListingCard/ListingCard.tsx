/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import {useListingContract} from '../../../../hooks/useContract';
declare let window: any;

type Props = { address: string };
export function ListingCard({address}: Props) {
  const listingContract = useListingContract(address);
  const [listingData, setListingData] = React.useState();

  const getListingData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const response = await listingContract?.getListingData();
        setListingData(response);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    getListingData();
  }, []);

  const imageURLs = [
    'https://amazingarchitecture.com/storage/1040/caplan-house-houses-tulum-israel-pacheco.jpg',
    // 'https://assets.architecturaldigest.in/photos/60c1b6f329d4e2bc957221f6/16:9/w_1280,c_limit/Tulum-colab-design-office-Mexico-photos.jpeg',
    // 'https://static.wixstatic.com/media/6917e4_3178f975ce594f4e85c53173805070fd~mv2.jpg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6917e4_3178f975ce594f4e85c53173805070fd~mv2.jpg',
    // 'https://a0.muscache.com/im/pictures/82f77325-46c3-4c2e-bb85-b6dca73e87ad.jpg?im_w=720',
    // 'https://www.unoretreats.com/wp-content/uploads/2022/05/UNORetreats_Villa_Verde_1.jpg',
  ];
  const randomIndex = Math.floor(Math.random() * imageURLs.length);

  // Get the image URL at the random index
  const randomImageURL = imageURLs[randomIndex];

  return (
    <>
      {listingData && (
        <Box
          maxW="sm"
          borderWidth="1px"
          gap={'5px'}
          rounded="lg"
          overflow="hidden"
        >
          <img style={{width: '100%'}} src={randomImageURL} alt="" />
          {/* <Image src={randomImageURL} layout="fill" alt={property.name} /> */}
          <Box p="6">
            <Text fontSize="xl" fontWeight="bold">
              {listingData[0]}
            </Text>

            <Text fontSize="md" color="gray.500" mt="1">
              {listingData[1]}
            </Text>

            <Text mt="2">{/* {listingData[1]} */}</Text>
          </Box>
        </Box>
      )}
    </>
  );
}
