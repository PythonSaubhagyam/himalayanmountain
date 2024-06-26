import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

export default function CarouselItem({
  banners,
  transparentBtn = true,
  autoplay ,
  autoplaySpeed ,
  fullWidth,
  desktopHeight = 120,
  textBanners = false,
}) {
  const navigate = useNavigate();
  // Settings for the slider
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay:  true,
    speed: 1500,
    autoplaySpeed:  2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
     
    ],
  };

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(Slider | null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, []);

  const shouldShowButtons = windowWidth > 330;
  const side = useBreakpointValue({ base: "0px", md: "-20px" });

  return (
    <Box
      position={"relative"}
      height={{ base: "100%", md: "50%" }}
      width={fullWidth ? "100vw" : "100%"}
      bg={textBanners && "bg.500"}
      
      // overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      {shouldShowButtons && (
        <>
      <IconButton
        aria-label="left-arrow"
        icon={<ChevronLeftIcon style={{ fontSize: 34 }} />}
        background={transparentBtn ? "#ffffff00" : "#434242"}
        color="#545454"
        size={{ base: "sm", md: "md" }}
        position="absolute"
        left={side}
        top={"50%"}
        transform={"translate(50%, -50%)"}
        zIndex={2}
        display={{ base: "none", md: "block" }}
        onClick={() => slider?.slickPrev()}
        _hover={"background:#ffffff00"}
        borderRadius={"40px"}
        style={{ display: { base: "none", md: "" } }}
      />
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        icon={<ChevronRightIcon style={{ fontSize: 34 }} />}
        background={transparentBtn ? "#ffffff00" : "#434242"}
        color="#545454"
        size={{ base: "sm", md: "md" }}
        position="absolute"
        right={side}
        top={"50%"}
        transform={"translate(-50%, -50%)"}
        zIndex={2}
        display={{ base: "none", md: "block" }}
        onClick={() => slider?.slickNext()}
        _hover={"background:#ffffff00 "}
        borderRadius={"40px"}
      
      />
         </>
            )}
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}  >
        {banners.map((bannerData, index) => (
          <>
            {textBanners === true ? (
              <Box key={index} textAlign="center" w="50vw" px={"12"} pb={4} >
                {/* <Text fontSize="md" mb={4}>
                  {bannerData?.content}
                </Text> */}
                <Text
                  display={"inline-block"}
                  fontSize={"20px"}
                  fontWeight={600} 
                 
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "#436131",
                      fontWeight: 900,
                      
                    }}
                  >
                    &#8220;
                  </span>{" "}
                  {bannerData?.content}
                  <span
                    style={{
                      color: "#436131",
                      fontSize: "1rem",
                      fontWeight: 900,
                    }}
                  >
                    &#8221;
                  </span>
                </Text>
                <Text
                  color={"gray"}
                  fontSize={"18px"}
                  fontWeight={600}
                  mt={4}
                  mb={8}
                >
                  -{bannerData.title}
                </Text>
              </Box>
            ) : (
              <Image
                cursor={bannerData?.image_url ? "pointer" : ""}
                key={index}
                src={bannerData.image}
                alt={bannerData.alt_text}
                onClick={() =>
                  bannerData?.image_url
                    ? navigate(`${bannerData?.image_url}`)
                    : {}
                }
                //objectFit="fit"
                w="100%"
                px={6}
                //h={{ base: "100%", md: `${desktopHeight}px` }}
              ></Image>
            )}
          </>
        ))}
      </Slider>
   
    </Box>
  );
}
