import React from "react";
import { getListingContract } from "../../../../hooks/useContract";
declare let window: any;

type Props = {
  listings: string[];
  wantedDates: string[];
};

export const Listings = ({ listings, wantedDates }: Props) => {
  const [availableListings, setAvailableListings] = React.useState<any>([]);

  const wantedDates1 = [
    "2022-08-03",
    "2022-08-04",
    "2022-08-05",
    "2022-08-06",
    "2022-08-07",
    "2022-08-08",
    "2022-08-09",
    "2022-08-10",
    "2022-08-11",
    "2022-08-12",
  ];

  const reservations1 = ["2022-08-10", "2022-08-11", "2022-08-12"];
  const reservations2 = ["2023-08-10", "2023-08-11", "2023-08-12"];

  const listings1 = [
    "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5",
    "0x856e4424f806D16E8CBC702B3c0F2ede5468eae8",
  ];
  console.log("[LISTINGS]  ", listings);

  React.useEffect(() => {
    showAvailableListings();
  }, []);

  const showAvailableListings = async () => {
    const addresses: string[] = [];
    listings.forEach((address) => {
      const listingContract = getListingContract(address);
      const getAllReservations = async () => {
        try {
          const reservations = await listingContract?.getAllReservations();
          if (!wantedDates1.some((r) => reservations.includes(r))) {
            addresses.push(address);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getAllReservations();
    });

    setAvailableListings(addresses);
  };

  console.log("avialable listings ", availableListings);

  listings.forEach((address) => {
    const listingContract = getListingContract(address);
    const getAllReservations = async () => {
      try {
        const reservations = await listingContract?.getAllReservations();
        const hasAnyDateBooked = wantedDates1.some((r) =>
          reservations.includes(r)
        );
        // console.log("Reservations   :", response);
        return reservations;
      } catch (error) {
        console.log(error);
      }
    };
    const reservations = getAllReservations();

    const caca = listings1.filter(
      () => !wantedDates1.some((r) => reservations2.includes(r))
    );
  });
  return <div></div>;
};
