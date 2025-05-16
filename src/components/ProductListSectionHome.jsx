import React, { useRef } from 'react';
import {
  Box,
  Container,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Slider from 'react-slick';
import ProductCardHome from './ProductCardHome';
import useScrollRestoration from '../utils/useScrollRestoration';

const ProductListSectionHome = ({ products = [], title }) => {
  const sliderRef = useRef(null);
  useScrollRestoration();

  const isMobile = window.innerWidth <= 768;
  const shouldUseCarousel = (isMobile && products.length > 1) || (!isMobile && products.length > 5);
  const showArrows = shouldUseCarousel && products.length > (isMobile ? 1 : 5);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container maxW="container.xl" px={0} position="relative">
      <Text
        as="h1"
        fontSize={{ base: 'xl', sm: '2xl', xl: '3xl' }}
        bgColor="bg.500"
        px={{ base: 2, md: 8 }}
        py={4}
        mb={8}
        textAlign={{ base: 'center', md: 'start' }}
        fontWeight={500}
      >
        {title}
      </Text>

      {showArrows && (
        <>
          <IconButton
            icon={<RiArrowLeftSLine size={25} />}
            aria-label="Previous"
            position="absolute"
            top="60%"
            left="20px"
            zIndex={100}
            borderRadius="full"
            size="sm"
            colorScheme="brand"
            boxShadow="base"
            _hover={{ opacity: 0.7, transform: 'scale(1.1)' }}
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <IconButton
            icon={<RiArrowRightSLine size={25} />}
            aria-label="Next"
            position="absolute"
            top="60%"
            right="20px"
            zIndex={100}
            borderRadius="full"
            size="sm"
            colorScheme="brand"
            boxShadow="base"
            _hover={{ opacity: 0.7, transform: 'scale(1.1)' }}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </>
      )}

      <Container maxW="container.xl" px={4} mt={5}>
        {shouldUseCarousel ? (
          <Slider {...settings} ref={sliderRef}>
            {products.map((product, i) => (
              <Box key={product?.product?.id || i} px={2}>
                <ProductCardHome product={product} />
              </Box>
            ))}
          </Slider>
        ) : (
          <Flex wrap="wrap" justify="center" gap={20}>
            {products.map((product, i) => (
              <Box key={product?.product?.id || i} maxW="230px" w="full">
                <ProductCardHome product={product} />
              </Box>
            ))}
          </Flex>
        )}
      </Container>
    </Container>
  );
};

export default ProductListSectionHome;
