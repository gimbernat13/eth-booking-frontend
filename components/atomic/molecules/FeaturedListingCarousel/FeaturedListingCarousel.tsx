/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {useState, useEffect, useContext} from 'react';
import React from 'react';
import {Button, Icon} from '@chakra-ui/react';
import styled from 'styled-components';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {SearchContext} from '../../../../context/searchContext';
import {setFeaturedListing} from '../../../../context/actionNames';

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
function ImageCarousel() {
  const {state, dispatch} = useContext(SearchContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://amazingarchitecture.com/storage/1040/caplan-house-houses-tulum-israel-pacheco.jpg',
    'https://assets.architecturaldigest.in/photos/60c1b6f329d4e2bc957221f6/16:9/w_1280,c_limit/Tulum-colab-design-office-Mexico-photos.jpeg',
    'https://static.wixstatic.com/media/6917e4_3178f975ce594f4e85c53173805070fd~mv2.jpg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6917e4_3178f975ce594f4e85c53173805070fd~mv2.jpg',
    'https://a0.muscache.com/im/pictures/82f77325-46c3-4c2e-bb85-b6dca73e87ad.jpg?im_w=720',
    'https://www.unoretreats.com/wp-content/uploads/2022/05/UNORetreats_Villa_Verde_1.jpg',
  ];
  async function handleNext() {
    if (currentImageIndex === images.length - 1) {
      await setCurrentImageIndex(0);
      dispatch({
        type: setFeaturedListing,
        payload: images[0],
      });
    } else {
      await setCurrentImageIndex(currentImageIndex + 1);
      dispatch({
        type: setFeaturedListing,
        payload: images[currentImageIndex + 1],
      });
    }
  }

  function handlePrev() {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
      dispatch({
        type: setFeaturedListing,
        payload: images[0],
      });
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
      dispatch({
        type: setFeaturedListing,
        payload: images[currentImageIndex + 1],
      });
    }
  }
  useEffect(() => {
    dispatch({
      type: setFeaturedListing,
      payload: images[currentImageIndex],
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImageIndex === 0) {
        setCurrentImageIndex(currentImageIndex + 1);
        dispatch({
          type: setFeaturedListing,
          payload: images[images.length - 1],
        });
      } else {
        setCurrentImageIndex(currentImageIndex - 1);
        dispatch({
          type: setFeaturedListing,
          payload: images[currentImageIndex - 1],
        });
      }
      dispatch({
        type: setFeaturedListing,
        payload: images[currentImageIndex],
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [state.featuredListing]);
  return (
    <div>
      <Flex>
        <Button onClick={handlePrev}>
          {' '}
          <Icon as={ChevronLeftIcon} />
        </Button>
        {/* <FeaturedListing /> */}
        <img
          src={images[currentImageIndex]}
          alt="image"
          width={'400px'}
          style={{
            borderRadius: 'var(--border-radius)',
            height: '500px',
            width: '500px',
            objectFit: 'cover',
          }}
        />
        <Button onClick={handleNext}>
          {' '}
          <Icon as={ChevronRightIcon} />{' '}
        </Button>
      </Flex>
    </div>
  );
}

export default ImageCarousel;
