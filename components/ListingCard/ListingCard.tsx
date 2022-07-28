import React from "react";
import styled from "styled-components";
import house from "./house.webp";
import beach from "../../assets/img/beach-house1.jpg";
import {
  Text,
  Wrap,
  WrapItem,
  Divider,
  Center,
  Badge,
  Heading,
  Button,
  ButtonGroup,
  Stack,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

type Props = { address: string };
export function ListingCard({ address }: Props) {
  const property = {
    imageUrl: beach,
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box mr="1rem" cursor={"pointer"} borderRadius="lg">
      <Wrap borderRadius="24px">
        {" "}
        <Image src={property.imageUrl} alt={property.imageAlt} />
      </Wrap>

      <Wrap display="flex" alignItems="baseline">
        <Wrap
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
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
        <WrapItem>{property.title}</WrapItem>
      </Wrap>

      <Wrap>
        <WrapItem>{property.formattedPrice}</WrapItem>
        <Wrap as="span" color="gray.600" fontSize="sm">
          <WrapItem>/ wk</WrapItem>
        </Wrap>
      </Wrap>

      <Wrap display="flex" mt="2" alignItems="center">
        {/* {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))} */}
        <Wrap as="span" ml="2" color="gray.600" fontSize="sm">
          <WrapItem> {property.reviewCount} reviews</WrapItem>
        </Wrap>
        <Wrap as="div" ml="2" color="gray.600" fontSize="sm">
          <WrapItem> {address} </WrapItem>
        </Wrap>
      </Wrap>
    </Box>
  );
}
