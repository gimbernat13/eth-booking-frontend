import {Flex, Tag, Text} from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

type Props = {};
const StyledFlexProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const ListingOverview = (props: Props) => {
  return (
    <StyledFlexProfile>
      <div>
        <Text as={'h2'}>Host: Hostname</Text>
        <Flex gap={'5px'}>
          <Tag>
        1 Room
          </Tag>
          <Tag>
        Swimming Pool
          </Tag>
          <Tag>
        2 Beds
          </Tag>
          <Tag>
          4 Guests
          </Tag>

        </Flex>

      </div>

    </StyledFlexProfile>
  );
};
