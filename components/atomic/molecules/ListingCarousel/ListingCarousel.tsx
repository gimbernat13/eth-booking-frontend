/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);


  const top = useBreakpointValue({base: '90%', md: '50%'});
  const side = useBreakpointValue({base: '30%', md: '40px'});


  const cards = [
    {
      title: 'Design Projects 1',
      text: 'The project board is an exclusive resource for contract work. It\'s perfect for freelancers, agencies, and moonlighters.',
      image:
        'https://assets.architecturaldigest.in/photos/60c1b6f329d4e2bc957221f6/16:9/w_1280,c_limit/Tulum-colab-design-office-Mexico-photos.jpeg',
    },
  ];

  return (
    <Box
      position={'relative'}
      height={'500px'}
      width={'full'}
      overflow={'hidden'}
      borderRadius="var(--border-radius)"
    >
      {/* CSS files for react-slick */}

      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="relative"
            backgroundImage={`url(${card.image})`}
          ></Box>
        ))}
      </Slider>
    </Box>
  );
}
