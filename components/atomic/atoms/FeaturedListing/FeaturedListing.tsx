import {Tag} from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

type Props = {}

const Overlay = styled.div`
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  background: #00000020;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: var(--border-radius);



`;

const Content = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 3fr 1fr;
  /* align-items: center; */
  position: relative;
  z-index: 1;
  transition: all 0.4s;
`;

const StyledFeaturedListing = styled.div`
  /* border-radius: var(--border-radius); */
  border-radius: 44px;
  height: 500px;
  width: 500px;
  background-color: #00000012;
  background-image: url('https://amazingarchitecture.com/storage/1040/caplan-house-houses-tulum-israel-pacheco.jpg');
  background-size: cover;
  color: white;
  padding: 2rem;
  /* border: 1px solid  #74747412; */
  position: relative;
  z-index: 0;
  &:hover ${Content}, ${Overlay} {
    opacity: 1;
  }
  &:hover ${Overlay} {
    background: #00000075;
  }
  cursor: pointer;
`;


export const FeaturedListing = ({}: Props) => {
  return (
    <StyledFeaturedListing>
      <Tag
        color={'white'}
        variant='outline'
        zIndex={3}>
          Featured Listing
      </Tag>

      {/* <Overlay />
      <Content>
        <div>
          <Heading fontWeight={'semibold'} mb={'5px'} size={'xl'}>
          Casa las putas
          </Heading>ƒ
        </div>

        <Bottom>
          <div>
            <Heading fontWeight={'semibold'} size={'md'}>
            Guanajuato
            </Heading>
            <Text>3 Bedrooms - 4 Beds </Text>
          </div>
          <Heading fontWeight={'semibold'} mb={'5px'} size={'lg'}>
          33 ETH / Night
          </Heading>{' '}
        </Bottom>
      </Content> */}
    </StyledFeaturedListing> );
};
