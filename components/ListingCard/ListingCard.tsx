import React from "react";
import beach from "../../assets/img/beach-house1.jpg";
import { Wrap, WrapItem, Box } from "@chakra-ui/react";
import Image from "next/image";
import { ethers } from "ethers";
import { useListingContract } from "../../hooks/useContract";
declare let window: any;

type Props = { address: string };
export function ListingCard({ address }: Props) {
  const listingContract = useListingContract(address);
  const [listingData, setListingData] = React.useState();

  console.log("listing contract ", listingContract);

  const getListingData = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const response = await listingContract?.getListingData();
        console.log("[Listing Data ]", response);
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
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  React.useEffect(() => {
    getListingData();
  }, []);

  return (
    <Box mr="1rem" cursor={"pointer"} borderRadius="lg">
      <Wrap borderRadius="24px">
        <Image src={property.imageUrl} alt={property.imageAlt} />
      </Wrap>

      <Wrap display="flex" alignItems="baseline">
        <Wrap
          color="gray.500"
          fontWeight="semibold"
          // letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          <WrapItem>
            {property.beds} beds &bull; {property.baths} baths
          </WrapItem>
        </Wrap>
      </Wrap>

      <Wrap
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
        <WrapItem>{listingData && listingData[0]}</WrapItem>
      </Wrap>

      <Wrap>
        <WrapItem>{property.formattedPrice}</WrapItem>
        <Wrap as="span" color="gray.600" fontSize="sm">
          <WrapItem>/ wk</WrapItem>
        </Wrap>
      </Wrap>

      <Wrap display="flex" mt="2" alignItems="center">
 
        <Wrap as="div" ml="2" color="gray.600" fontSize="sm">
          <WrapItem> {address} </WrapItem>
        </Wrap>
      </Wrap>
    </Box>
  );
}
