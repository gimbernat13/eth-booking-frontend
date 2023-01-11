/* eslint-disable max-len */
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import React, {useContext} from 'react';
import styled from 'styled-components';
import {SearchContext} from '../../../../context/searchContext';
import ImageCarousel from '../../molecules/FeaturedListingCarousel/FeaturedListingCarousel';
import {CreateListingModal} from '../CreateListingModal/CreateListingModal';

type Props = {};

const Bg = styled.div<any>`
  background: ${(props) => `url(${props.bg})`};
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  position: relative;
  min-height: 80vh;
`;
const Overlay = styled.div<any>`
  opacity: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${(props) =>
    !props.isDark ?
      'linear-gradient(to bottom, #1a202c63 0%, #121619 100%)' :
      'linear-gradient(to bottom, white, #ffffff74 50%, white);'};
  z-index: -2;
  backdrop-filter: blur(18px);
  /* border-radius: var(--border-radius); */

  /* 'linear-gradient(to bottom, white, #1a202c63 50%, white);'
  'linear-gradient(to bottom, #1a202c63, #ffffff74 50%, #1a202c63);' */
`;
const Content = styled.div`
  z-index: 3;
`;

export const HeroSection = ({}: Props) => {
  const {colorMode} = useColorMode();
  const {state} = useContext(SearchContext);

  return (
    <Bg bg={state.featuredListing}>
      <Overlay isDark={colorMode === 'light' && true} />
      <Content>
        <Grid
          pt=" 8rem"
          height={'100vh'}
          alignItems={'center'}
          templateColumns={{md: '3fr 3fr'}}
          padding={{base: '3rem', md: '4rem  8rem'}}
        >
          <Box pt={'1rem'} gap={'11rem'} maxWidth="500px">
            {/* <Text>amo la mierda  { state.featuredListing }</Text> */}
            <Heading fontWeight={'bold'} fontSize={'2em'}>
              On Chain Booking
            </Heading>
            <Heading fontWeight={'bold'} fontSize={'4em'}>
              Travel, Host,
            </Heading>
            <Heading fontWeight={'bold'} fontSize={'4em'}>
              Earn Rewards
            </Heading>

            <HStack
              pt={'1rem'}
              spacing={4}
              display={{base: 'none', md: 'flex'}}
            >
              <Button disabled variant="outline" colorScheme={'purple'}>
                Claim Travel NFT
              </Button>

              <Button disabled variant="outline" colorScheme={'purple'}>
                $BOOK Token
              </Button>
              <CreateListingModal />
            </HStack>
          </Box>
          <Box display={{base: 'none', md: 'flex'}}>
            <ImageCarousel />
            {/* <FeaturedListing /> */}
          </Box>
        </Grid>
      </Content>
    </Bg>
  );
};
