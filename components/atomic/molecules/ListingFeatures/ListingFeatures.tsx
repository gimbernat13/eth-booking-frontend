import { Wrap, WrapItem, Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import pool from "../../../../assets/img/swimming-pool.png";
import study from "../../../../assets/img/study.png";
import chimney from "../../../../assets/img/chimney.png";
type Props = {};
const StyledFlexFeature = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: 1rem 0;
  p {
    margin-left: 15px;
  }
`;
export const ListingFeatures = (props: Props) => {
  return (
    <div>
      <StyledFlexFeature>
        <Wrap>
          <WrapItem>
            <Center w="30px" h="30px">
              <Image src={study} />
            </Center>
          </WrapItem>
        </Wrap>
        <Wrap>
          <div>
            <WrapItem>
              <Text fontWeight={"500"}>A place to do Crack Cocaine</Text>
            </WrapItem>
            <WrapItem>
              <Text fontWeight={"400"} fontSize={"14px"}>
                Niggaz be lovin this shit
              </Text>
            </WrapItem>
          </div>
        </Wrap>
      </StyledFlexFeature>
    </div>
  );
};
