/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {useFormik} from 'formik';
import {
  Input,
  Button,
  Textarea,
  Spinner,
  Box,
  useToast,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import {useState} from 'react';
import listingFactory from '../../../../eth/ListingFactory.json';
import React from 'react';
import {useContract} from 'wagmi';
import {ethers} from 'ethers';
import Link from 'next/link';
import {ExternalLinkIcon} from '@chakra-ui/icons';
declare let window: any;

interface MyFormValues {
  // submit: (
  //   title: string,
  //   description: string,
  //   cost: number,
  //   ipfsHash: string
  // ) => void;
}

export function CreateListingForm({}: MyFormValues) {
  const [status, setStatus] = useState<any>('');
  const [success, setSucess] = useState(false);
  const [isListingLoading, setIsListingLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const listingFactoryContract = useContract({
    address: listingFactory.address,
    abi: listingFactory.abi,
    signerOrProvider: signer,
  });

  const toast = useToast();

  React.useEffect(() => {
    provider.once('block', () => {
      listingFactoryContract?.on('CreateListing', (event: any) => {
        toast({
          title: 'Listing created.',
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
  }, [listingFactoryContract]);
  async function createListing(
      title: string,
      description: string,
      cost: number,
  ) {
    if (typeof window.ethereum !== 'undefined') {
      setIsLoading(true);
      try {
        const response = await listingFactoryContract?.createListing(
            title,
            description,
            cost,
            'ipfshash',
        );
        setIsListingLoading(true);
        setStatus(response);
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      cost: 0,
      photos: [],
    },
    onSubmit: async (values) => {
      createListing(values.title, values.description, values.cost);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {success && (
        <Box
          gap={'5px'}
          display="flex"
          flexDir={'column'}
          justifyContent="center"
          alignItems="center"
        >
          <VStack>
            <Heading fontSize={'xl'}> Listing Created, much smart!</Heading>
            <Button variant={'outline'}>
              View on Etherscan
              <ExternalLinkIcon mx="2px" />
            </Button>
          </VStack>
          <Box>
            <img
              style={{height: '150px'}}
              src="https://i.imgur.com/mweDpe6.gif"
              alt=""
            />
          </Box>
          <HStack>
            <Button>Go to your Listing</Button>
            <Button disabled colorScheme={'purple'}>
              Claim your NFT
            </Button>
          </HStack>
          <Link href="/home">
            <span>{/* {status.hash} */}</span>
          </Link>
        </Box>
      )}
      {isListingLoading && (
        <div>
          <Box
            gap={'5px'}
            display="flex"
            flexDir={'column'}
            justifyContent="center"
            alignItems="center"
            height="30vh"
          >
            <Heading fontSize={'lg'}>Listing your Crib...</Heading>
            <Spinner
              // thickness="4px"
              speed="0.65s"
              // emptyColor="gray.200"
              // color="blue.500"
              size="lg"
            />
          </Box>
        </div>
      )}

      {!isListingLoading && !success && (
        <div>
          <label htmlFor="title">Listing Name</label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <label htmlFor="cost">Cost per night</label>

          <Input
            id="cost"
            name="cost"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.cost}
          />

          <label htmlFor="cost">Photos</label>

          {/* <Input
        type="file"
        onChange={(e: any) => setFileImg(e.target.files[0])}
        required
      /> */}

          <label htmlFor="cost">Description</label>
          <Textarea
            id="descripton"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <Button
            disabled={isLoading}
            colorScheme={'purple'}
            type="submit"
            m={'1rem 0'}
            float={'right'}
          >
            {isLoading ? (
              <HStack>
                <Spinner /> <span>Confirm in Wallet</span>
              </HStack>
            ) : (
              'Create Listing'
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
