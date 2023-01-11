/* eslint-disable max-len */
import type {NextPage} from 'next';
import React from 'react';
import {HeroSection} from '../components/atomic/organisms/HeroSection/HeroSection';
import {Listings} from '../components/atomic/organisms/Listings/Listings';


const Home: NextPage = (props: any) => {
  return (
    <>
      <HeroSection />
      <Listings />
    </>
  );
};

export default Home;
