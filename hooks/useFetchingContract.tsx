import { Contract } from "ethers";
import React from "react";
declare let window: any;

type Props = {
  contract: Contract;
};

const useFetchingContract = ({ contract }: Props) => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const response = await contract.getListingData();
        console.log("[Listing Data ]", response);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    fetchData()
  }, []);

  return data;
};
