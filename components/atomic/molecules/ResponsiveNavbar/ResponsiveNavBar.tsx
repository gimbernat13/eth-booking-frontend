/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {ReactNode} from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import React from 'react';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {SearchListingsForm} from '../SearchListingsForm/SearchListingsForm';
import {ColorModeSwitcher} from '../../atoms/ColorModeSwitcher/ColorModeSwitcher';
import {CreateListingModal} from '../../organisms/CreateListingModal/CreateListingModal';

const Links = ['My Listings', 'Profile'];

const NavLink = ({children}: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function ResponsiveNavbar() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={4}
        boxShadow="sm"
        p=".2rem 3rem"
        justifyContent="space-between"
        alignItems={'center'}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{lg: 'none', sm: 'flex', xl: 'flex'}}
          >
            <Link href={'/'}>
              <Text fontWeight={'bold'} fontSize="xl">
                Web3 Booking
              </Text>
            </Link>{' '}
          </HStack>
          <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
            <SearchListingsForm />
            <Box display={{base: 'none', md: 'flex'}}>
              <CreateListingModal />{' '}
            </Box>
          </HStack>

          <HStack as={'nav'} spacing={4}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{base: 'none', lg: 'flex'}}
            >
              <ConnectButton />
            </HStack>
            <HStack
              as={'nav'}
              spacing={4}
              display={{base: 'none', md: 'flex'}}
            >
              <ColorModeSwitcher />
            </HStack>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{md: 'none'}}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
        </Flex>

        {isOpen ? (
          <VStack pb={4} display={{md: 'none'}}>
            <Stack as={'nav'} spacing={4}>
              <SearchListingsForm />
              <CreateListingModal />
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <ConnectButton />
              <ColorModeSwitcher />
            </Stack>
          </VStack>
        ) : null}
      </Box>
    </>
  );
}
