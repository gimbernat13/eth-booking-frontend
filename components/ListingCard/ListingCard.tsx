import React from "react";
import beach from "../../assets/img/beach-house1.jpg";
import { Wrap, WrapItem, Box } from "@chakra-ui/react";
import Image from "next/image";
import { getListingContract } from "../../hooks/useContract";
declare let window: any;

type Props = { address: string };
export function ListingCard({ address }: Props) {
  const listingContract = getListingContract(address);
  const [listingData, setListingData] = React.useState();

  const getListingData = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const response = await listingContract?.getListingData();
        setListingData(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const property = {
    imageUrl: beach,
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    formattedPrice: "1 ETH",
    reviewCount: 34,
    rating: 4,
  };

  React.useEffect(() => {
    getListingData();
  }, []);

  return (
    <Wrap
      _hover={{
        // boxShadow: "md",
        // border: "1px solid lightgray",
        transform: "translateY(-2px)",
        filter: "brightness(1.1)",
      }}
      mr="1rem"
      mb="1rem"
      transition=".2s"
      cursor={"pointer"}
      borderRadius="xl"
      border="1px solid transparent"
    >
      <Wrap borderRadius="xl">
        <Image src={property.imageUrl} alt={property.imageAlt} />
      </Wrap>
      <Box
        // p={3}
        mr="1rem"
        cursor={"pointer"}
        borderRadius="lg"
      >
        <Wrap display="flex" alignItems="baseline">
          <Wrap
            color="gray.500"
            fontWeight="semibold"
            // letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <WrapItem>3 Beds</WrapItem>
          </Wrap>
        </Wrap>

        <Wrap
          mt="1"
          fontWeight="semibold"
          as="h4"
          letterSpacing={"tight"}
          lineHeight="tight"
          noOfLines={1}
        >
          <WrapItem>{listingData && listingData[0]}</WrapItem>
        </Wrap>

        <Wrap>
          <WrapItem>{property.formattedPrice}</WrapItem>
          <Wrap as="span" color="gray.600" fontSize="sm">
            <WrapItem>/ Day</WrapItem>
          </Wrap>
        </Wrap>

        <Wrap display="flex" mt="2" alignItems="center">
          <Wrap as="div" ml="2" color="gray.600" fontSize="sm">
            {/* <WrapItem> {address} </WrapItem> */}
          </Wrap>
        </Wrap>
      </Box>
    </Wrap>
  );
}
