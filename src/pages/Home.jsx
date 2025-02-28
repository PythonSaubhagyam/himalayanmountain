import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";
import LoginModal from "../components/LoginModal";
import checkLogin from "../utils/checkLogin";
import ProductListSectionHome from "../components/ProductListSectionHome";
import {
  Container,
  Flex,
  Image,
  Heading,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Link,
  Center,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Card,
  Skeleton,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink, Link as ReactRouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";
import { info } from "sass";
import {
  initializeAppData
} from "../redux/slices/homeApi";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { Helmet } from "react-helmet";
import MetaHome from "../components/MetaHome";
import BlogSliderHome from "../components/BlogSliderHome";



export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "200", lg: "400" });
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [sections, setSections] = useState([]);
  const [countUp, setCountUp] = useState(false);
  const loginInfo = checkLogin();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  const [showPopup, setShowPopup] = useState(
    sessionStorage.getItem("hasShownPopup")
  );
  const isMobiles = width <= 768;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    banners,
    upperSection,
    skinSection,
    lowerSection,
    blogs,
    newArrival,
    mustTry,
    bestSeller,
    loader,
    statistics,
    lowerMostSection,
    hasFetched
  } = useSelector((state) => state.banners);

 

  const { aboutSection, certificateSection } = upperSection;
  const { glowingSkinSection, featuredProductsSection, appleCiderSection } =
    skinSection;
  const {
    ethicalTeaSection,
    cupOfTeaSection,
    informativeSection,
    licencesSection,
    nonGMOSection,
  } = lowerSection;
  const { awardsSection, servicesSection, availableSection } = lowerMostSection;

  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };

    init();
    if (showPopup === null && !loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(initializeAppData());
    }
  }, [dispatch, hasFetched]);
  const pageUrl = "/";
  return (
    <>
      <MetaHome pageUrl={pageUrl} />
      {/* <Helmet>
        <title>Himalayan Mountain - Home</title> 
        <meta
          name="description"
          content=""
        />
      </Helmet> */}
      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      <Container maxW={"container.xl"} px={0}>
        {loader === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={banners?.length > 0 && banners} />
        )}
      </Container>

      {aboutSection?.length > 0 &&
        aboutSection[0]?.is_visible_on_website === true && (
          <Container maxW={"8xl"} mb={8} mt={2} centerContent>
            <Grid
              templateColumns={{
                md: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={2}
              my={4}
            >
              <GridItem colSpan={1}>
                <Image
                  w={{ base: "70%", md: "100%" }}
                  mx={{ base: "auto" }}
                  src={aboutSection[0]?.image}
                />
              </GridItem>
              <GridItem px={{ base: 15, lg: 20 }} colSpan={2}>
                <Text
                  fontSize={{ base: "xl", sm: "2xl", xl: "29px" }}
                  fontWeight={500}
                  color={"text.500"}
                  textAlign={{ base: "center", md: "start" }}
                  px={{ base: 2, md: 1 }}
                  py={2}
                >
                  {aboutSection[0]?.label}
                </Text>
                <Text
                  color={"text.300"}
                  align={{ base: "justify" }}
                  fontSize={{ base: "sm", lg: "lg" }}
                  whiteSpace={"pre-line"}
                >
                  {aboutSection[0]?.description}
                  {/* Himalayan mountain draws inspiration From "Bansi Gir
                  Gaushala", and its work towards reviving Bharat’s ancient “Gau
                  Sanskriti”. We believe ancient Bharat holds the solution to
                  many of the challenges facing humanity today.
                  <br />
                  <br />
                  Himalayan Mountain Himalayan mountain draws inspiration From
                  "Bansi Gir Gaushala", and its work towards reviving Bharat’s
                  ancient “Gau Sanskriti”. We believe ancient Bharat holds the
                  solution to many of the challenges facing humanity today.
                  Himalayan mountain mission is to change the way people think
                  about food and beverage, bringing simple Natural & Ayurvedic
                  wisdom back into people’s lives. Our brand aims to recreate
                  the same purity and authenticity that is characteristic of
                  ancient Bharat.While doing so, we help people empower farmers
                  who are the cornerstone of "Bharatiya & Gau Sanskriti". */}
                  <br />
                  <br />
                </Text>
                <Link
                  fontWeight={700}
                  color={"brand.500"}
                  as={RouterLink}
                  to={"/about-us"}
                  border={"1px"}
                  borderRadius={"8px"}
                  borderColor={"brand.500"}
                  p={3}
                  ml={5}
                >
                  Read more
                </Link>
              </GridItem>
            </Grid>
          </Container>
        )}

      {certificateSection?.length > 0 &&
        certificateSection[0]?.is_visible_on_website === true && (
          <Container mb={5} px={0} maxW={"container.xl"} centerContent>
            <LazyLoadImage
              src={certificateSection[0]?.image}
              alt=""
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
                width: "100%",
              }}
            />
          </Container>
        )}

      {glowingSkinSection?.length > 0 &&
        glowingSkinSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} px={0} centerContent>
            <Image
              src={
                glowingSkinSection[0]?.images?.length > 0 &&
                glowingSkinSection[0]?.images[0]?.image
              }
              onClick={() => {
                if (glowingSkinSection[0]?.images[0]?.product !== null) {
                  navigate(
                    `/products/${glowingSkinSection[0]?.images[0]?.product}/${glowingSkinSection[0]?.images[0]?.product_name.replace(/\s+/g, "-")}`
                  );
                }
              }}
              cursor={"pointer"}
              w={"100%"}
            />
          </Container>
        )}
      {featuredProductsSection?.length > 0 &&
        featuredProductsSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} px={0}>
            <Text
              fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
              color={"brand.500"}
              textAlign={{ base: "center", md: "start" }}
              mb={10}
              bgColor={"bg.500"}
              px={{ base: 2, md: 8 }}
              py={4}
            >
              {featuredProductsSection[0]?.label}
            </Text>
            <Grid
              templateColumns={{
                md: "repeat(2, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={5}
              my={4}
              px={20}
            >
              {featuredProductsSection[0]?.images?.length > 0 &&
                featuredProductsSection[0]?.images?.map((data) => (
                  <GridItem>
                    <Image
                      src={data.image}
                      onClick={() => {
                        if (data?.product !== null) {
                          navigate(`/products/${data.product}/${data.product_name.replace(/\s+/g, "-")}`);
                        }
                      }}
                      cursor={"pointer"}
                    />
                  </GridItem>
                ))}
            </Grid>
          </Container>
        )}
      {ethicalTeaSection?.length > 0 &&
        ethicalTeaSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} py={5} px={0}>
            <Text
              fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
              color={"brand.500"}
              textAlign={{ base: "center", md: "start" }}
              mb={10}
              bgColor={"bg.500"}
              px={{ base: 2, md: 8 }}
              py={4}
            >
              {ethicalTeaSection[0]?.label}
            </Text>
            <Grid
              templateColumns={{
                md: "repeat(4, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={5}
              my={4}
              px={20}
            >
              {ethicalTeaSection[0]?.images?.length > 0 &&
                ethicalTeaSection[0]?.images?.map((data) => (
                  <GridItem>
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Image src={data.image} w={"40%"} />
                      <Text>{data.label}</Text>
                    </Flex>
                  </GridItem>
                ))}
            </Grid>
          </Container>
        )}

      {newArrival && newArrival?.length > 0 && (
        <ProductListSectionHome
          title="Try Our New Products"
          loading={loader}
          products={newArrival}
          type={"carousal"}
        />
      )}
      {mustTry && mustTry?.length > 0 && (
        <ProductListSectionHome
          title="Must Try: Himalayan Mountain Products"
          loading={loader}
          products={mustTry}
          type={"carousal"}
        />
      )}
      {bestSeller && bestSeller?.length > 0 && (
        <ProductListSectionHome
          title="All Time Best Sellers"
          loading={loader}
          products={bestSeller}
          type={"carousal"}
        />
      )}

      {appleCiderSection?.length > 0 &&
        appleCiderSection[0]?.is_visible_on_website === true && (
          <Container maxW={"8xl"} centerContent>
            <Image
              src={
                appleCiderSection[0]?.images?.length > 0 &&
                appleCiderSection[0]?.images[0]?.image
              }
              onClick={() => {
                if (appleCiderSection[0]?.images[0]?.product !== null) {
                  navigate(`/products/${appleCiderSection[0]?.images[0]?.product}/${appleCiderSection[0]?.images[0]?.product_name.replace(/\s+/g, "-")}`);
                }
              }}
              cursor={"pointer"}
              w={"100%"}
            />
          </Container>
        )}
      {cupOfTeaSection?.length > 0 &&
        cupOfTeaSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} px={0} py={6} centerContent>
            <Image src={cupOfTeaSection[0]?.image} w={"100%"} />
          </Container>
        )}
      {informativeSection?.length > 0 &&
        informativeSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} px={0} py={6} centerContent>
            <Grid
              templateColumns={{
                md: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={10}
              my={4}
              px={"10%"}
            >
              {informativeSection[0]?.images?.length > 0 &&
                informativeSection[0]?.images?.map((data) => (
                  <GridItem>
                    <Flex
                      gap={3}
                      flexDirection={"column"}
                      alignItems={"start"}
                      justifyContent={"center"}
                    >
                      <Image src={data.image} w={100} />

                      <Text
                        color={"brand.500"}
                        fontWeight={600}
                        fontSize={"22px"}
                      >
                        {data.label}
                      </Text>
                      <Text
                        textAlign={"justify"}
                        fontSize={"16px"}
                        color={"text.300"}
                      >
                        {data.description}
                      </Text>
                    </Flex>
                  </GridItem>
                ))}
            </Grid>
          </Container>
        )}
      
      <BlogSliderHome blogs={blogs} />

      {statistics?.length > 0 && (
        <Container backgroundColor={"bg.500"} maxW={"container.xl"} py={2}>
          <SimpleGrid
            columns={[2, 3, null, 6]}
            px={6}
            maxW={"container.xl"}
            my={6}
            backgroundColor={"bg.500"}
            align="center"
            spacingX={{ base: "10vw", md: "30px" }}
            spacingY="40px"
          >
            {statistics?.length > 0 &&
              statistics?.map((data) => (
                <Stat>
                <StatNumber
                      color="text.300"
                      fontSize={{ base: "3xl", md: "3xl" }}
                    >
                      <ScrollTrigger onEnter={() => setCountUp(true)}>
                        {countUp ? (
                          <CountUp
                            start={0}
                            end={Number(data.value.replace(/[^\d]/g, ""))}
                            duration={3}
                            delay={0}
                          />
                        ) : null}
                        {data?.name === "Positive Feedback" ? "+%" : data?.name === "Generation of Farmers" ? "th" : "+"}
                      </ScrollTrigger>
                    </StatNumber>
                  <StatHelpText color="gray.600">{data?.name}</StatHelpText>
                </Stat>
              ))}
          </SimpleGrid>
        </Container>
      )}

      {awardsSection?.length > 0 &&
        awardsSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "container.xl" }}>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 20 }}
              mx="auto"
              align={"center"}
              mt={3}
              pb={"10px"}
            >
              {awardsSection[0]?.label}
            </Heading>

            <Text my={5} textAlign={"center"} color="text.300">
              We are committed to quality and each of our facilities is
              independently certified by an industry-accredited agency.
            </Text>
            <Flex
              justifyContent="space-evenly"
              direction={{ base: "column", md: "row" }}
              align="center"
              gap={12}
              pt={1}
              pb={6}
            >
              <LazyLoadImage
                src={
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[0]?.image
                }
                alt="global-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
              <LazyLoadImage
                src={
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[1]?.image
                }
                alt="ciolook-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </Flex>
          </Container>
        )}
      {licencesSection?.length > 0 &&
        licencesSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "7xl" }}>
            <Box
              w="100%"
              backgroundSize="100%"
              backgroundPosition="50% 100%"
              backgroundRepeat={"no-repeat"}
            >
              <Heading
                color="brand.500"
                fontSize={{ md: 33, base: 24 }}
                mx="auto"
                align={"center"}
                my={"5"}
              >
                {licencesSection[0]?.label}
              </Heading>
            </Box>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
              mb={10}
              px={{ md: "11%" }}
              alignItems={"center"}
            >
              {licencesSection[0]?.images?.length > 0 &&
                licencesSection[0]?.images?.map((data) => (
                  <GridItem>
                    <Image
                      mx={"auto"}
                      src={data.image}
                      boxSize={{ base: 130, md: 140 }}
                    />
                  </GridItem>
                ))}
            </Grid>
          </Container>
        )}

      {nonGMOSection?.length > 0 &&
        nonGMOSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} pt={15} pb={20} centerContent>
            <Image w={{ md: "65%" }} src={nonGMOSection[0]?.image} />
          </Container>
        )}
      {servicesSection?.length > 0 &&
        servicesSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "container.xl" }} centerContent>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 20 }}
              mx="auto"
              align={"center"}
              my={"5"}
              pb={"10px"}
            >
              {servicesSection?.length > 0 && servicesSection[0].label}
            </Heading>

            <Box display={"flex"} justifyContent={"center"}>
              <LazyLoadImage
                src={
                  servicesSection?.length > 0 &&
                  servicesSection[0]?.images[0].image
                }
                w={{ base: "100%", md: "100%" }}
                alt=""
                py={4}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </Box>
          </Container>
        )}
      {availableSection?.length > 0 &&
        availableSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} mb={5} px={0} centerContent>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 22 }}
              mx="auto"
              align={"center"}
              my={"5"}
              pb={"10px"}
            >
              {availableSection?.length > 0 && availableSection[0].label}
            </Heading>

            <Image
              src={
                availableSection?.length > 0 &&
                availableSection[0]?.images[0].image
              }
              w={"container.xl"}
              alt=""
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
              }}
            />
          </Container>
        )}
      {!checkLogin().isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <ScrollToTop />
      <Footer />
    </>
  );
}
