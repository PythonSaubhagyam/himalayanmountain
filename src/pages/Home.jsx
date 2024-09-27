import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";

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
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";

const NaturalTea = [
  {
    id: 1,
    image: require("../assets/home/no-color.jpg"),
    title: "No Chemical / No Color",
  },
  {
    id: 2,
    image: require("../assets/home/friendly.jpg"),
    title: "Environment Friendly",
  },
  {
    id: 3,
    image: require("../assets/home/mental_health.jpg"),
    title: "Relaxation & Mental HealthColor ",
  },
  {
    id: 4,
    image: require("../assets/home/safest.jpg"),
    title: "The Safest Choice",
  },
  {
    id: 5,
    image: require("../assets/home/good.jpg"),
    title: "Good For Digestive system",
  },
  {
    id: 6,
    image: require("../assets/home/weight_loss.jpg"),
    title: "Helps in Weight Loss",
  },
  {
    id: 7,
    image: require("../assets/home/better.jpg"),
    title: "Better Taste",
  },
  {
    id: 8,
    image: require("../assets/home/blood_sugar.jpg"),
    title: "Best For Blood Sugar",
  },
];

const Details = [
  {
    id: 1,
    title: "Since 2010",
    content:
      "We have a legacy of serving mankind with the wonders of Mother Nature and Ayurveda since 2010.",
    image: require("../assets/home/since 2015.jpg"),
  },
  {
    id: 2,
    title: "Quality Herbal Product",
    content:
      "Products of Himalayan Mountain are developed at DSIR Recognized Dedicated R&D Centre",
    image: require("../assets/home/Quality herbal product.jpg"),
  },
  {
    id: 3,
    title: "Made in Bharat (India)",
    content:
      "Suryan Organic is an Indian Company, serving across the globe with the invaluable treasures of Indian Traditional Science.",
    image: require("../assets/home/made in india.jpg"),
  },
  {
    id: 4,
    title: "Inspired By Ayurveda",
    content:
      "Ayurvedic philosophy states that health and wellness depend on a delicate balance between the mind, body, and spirit. This holistic approach of Ayurveda inspires us to serve the humanity.",
    image: require("../assets/home/inspired by ayurveda.jpg"),
  },
  {
    id: 5,
    title: "Available in 30+ Countries",
    content:
      "Serving worldwide with the traditional wisdom of Ayurevda in scientific manner across 5+ countries",
    image: require("../assets/home/avialble in 10+contries.jpg"),
  },
  {
    id: 6,
    title: "Infused With Natural Ingredients",
    content:
      "Mother nature is a treasure with many different ways to maintain our health & wellness. Thus, we count on natural active ingredients for our quality products.",
    image: require("../assets/home/natural ingredient.jpg"),
  },
];

const Licences = [
  {
    src: require("../assets/Home/apeda.jpg"),
    alt: "Gir Gauveda",
    size:180
  },
  {
    src: require("../assets/Home/msme.jpg"),
    alt: "Himalayan Mountain",
    size:180
  },
  {
    src: require("../assets/Home/tea_board_1.jpg"),
    alt: "Vama Herbal",
    size:110
   
  },
  {
    src: require("../assets/Home/fassai 2.png"),
    alt: "CoffeeCo",
    size:190
  },
  // {
  //   src: require("../assets/Home/spices board.jpg"),
  //   alt: "Spices Board",
  //   size:160
  // },

  // {
  //   src: require("../assets/Home/lPCR_logo.jpg"),
  //   alt: "Shishu veda",
  //   size:110
  // },
];
const imageInfo = [
  {
    src: require("../assets/home/gmo-icon.png"),
    name: "NON-GMO Product",
  },
  {
    src: require("../assets/home/natural.png"),
    name: "Ethical & Natural",
  },

  {
    src: require("../assets/home/quality.png"),
    name: "Quality you'll Love Guaranteed",
  },
  {
    src: require("../assets/home/order.png"),
    name: "Minimum Order Value Rs.250",
  },
  {
    src: require("../assets/home/best.png"),
    name: "Best Service",
  },
];
const banner = [
  {
    id: 11,
    alt_text: "Image2",
    image: require("../assets/Home Page Banners/01.jpg"),
    display_status: true,
    image_url: "/products/1554",
  },
  {
    id: 12,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/02.jpg"),
    display_status: true,
    image_url: "/products/1555",
  },
  {
    id: 13,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/03.jpg"),
    display_status: true,
    image_url: "/products/1558",
  },
  {
    id: 14,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/04.jpg"),
    display_status: true,
    image_url: "/products/1562",
  },
  {
    id: 15,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/05.jpg"),
    display_status: true,
    image_url: "/products/1556",
  },
];
const ourFeaturedProduct = [
  { id: 1559, image1: require("../assets/home/CTC_black.jpg") },
  { id: 1561, image1: require("../assets/home/green_tea.jpg") },
  { id: 1558, image1: require("../assets/home/masala_chai.jpg") },
  { id: 1557, image1: require("../assets/home/lemon_grass_chai.jpg") },
];

export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [banners, setBanners] = useState(banner);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [newArrival, setNewArrival] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
 
  // let [isFull] = useMediaQuery("(max-width:1920px)");
  const [blogs, setBlogs] = useState([]);
  const isMobiles = width <= 768;
  const navigate = useNavigate();

  useEffect(() => {
    CheckOrSetUDID();
    getMustTry();
    getBestSeller();
    getNewArrival();
    getBlogs();
  }, []);
  async function getNewArrival() {
    const response = await client.get("newarrival/list");
    if (response) {
      setNewArrival(response.data.data);
    }
    setLoading(false);
  }
  async function getMustTry() {
    const response = await client.get("musttry/list");
    if (response) {
      setMustTry(response.data.data);
    }
    setLoading(false);
  }
  async function getBestSeller() {
    const response = await client.get("bestofalltime/list");
    if (response) {
      setBestSeller(response.data.data);
    }
    setLoading(false);
  }

  async function getBlogs() {
    const params = {};
    const response = await client.get("/home/blogs/", {
      params: params,
    });
    if (response.data.status === true) {
      setBlogs(response.data.blogs);
    }
  }

  return (
    <>
      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      <Container maxW={"container.xl"} px={0}>
        {loading === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={banners} />
        )}
      </Container>

      <Container maxW={"8xl"} mb={8} mt={2} centerContent>
        <Grid
          templateColumns={{
            md: "repeat(3, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gap={2}
          my={4}
        >
          <GridItem colSpan={1}  >
            <Image
              w={{base:"70%",md:"100%"}}
              mx={{base:"auto"}}
              src={require("../assets/home/left himalayan mountain about.jpg")}
            />
          </GridItem>
          <GridItem px={{ base: 15, lg: 20 }} colSpan={2}>
            <Text
              fontSize={{ base: "xl", sm: "2xl", xl: "29px" }}
              fontWeight={500}
              color={"text.500"}
              textAlign={{ base: "center", md: "start" }}
              px={{ base: 2, md: 8 }}
              py={2}
        
            >
              About Himalayan Mountain
            </Text>
            <Text
              color={"text.300"}
              align={{ base: "justify" }}
              fontSize={{ base: "sm", lg: "lg" }}
            >
              Himalayan mountain draws inspiration From "Bansi Gir Gaushala",
              and its work towards reviving Bharat’s ancient “Gau Sanskriti”. We
              believe ancient Bharat holds the solution to many of the
              challenges facing humanity today.
              <br />
              <br />
              Himalayan Mountain Himalayan mountain draws inspiration From
              "Bansi Gir Gaushala", and its work towards reviving Bharat’s
              ancient “Gau Sanskriti”. We believe ancient Bharat holds the
              solution to many of the challenges facing humanity today.
              Himalayan mountain mission is to change the way people think about
              food and beverage, bringing simple Natural & Ayurvedic wisdom back
              into people’s lives. Our brand aims to recreate the same purity
              and authenticity that is characteristic of ancient Bharat.While
              doing so, we help people empower farmers who are the cornerstone
              of "Bharatiya & Gau Sanskriti".
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

      <Container mb={5} px={0} maxW={"container.xl"} centerContent>
        <LazyLoadImage
          src={require("../assets/home/himalayan.jpg")}
          alt=""
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
      </Container>

      <Container maxW={"container.xl"} px={0}>
        <Image
          src={require("../assets/home/gree tea.jpg")}
          onClick={() => navigate("/products/1554")}
          cursor={"pointer"}
        />
      </Container>
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
          Our Featured Product
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
          {ourFeaturedProduct.map((data) => (
            <GridItem>
              <Image
                src={data.image1}
                onClick={() => navigate(`/products/${data.id}`)}
                cursor={"pointer"}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
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
          Reasons to Buy Ethical & Natural Tea
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
          {NaturalTea.map((data) => (
            <GridItem>
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image src={data.image} w={"40%"} />
                <Text>{data.title}</Text>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>

      <ProductListSectionHome
        title="Try Our New Products"
        loading={loading}
        products={newArrival}
      />

      <ProductListSectionHome
        title="Must Try: Himalayan Mountain Products"
        loading={loading}
        products={mustTry}
      />
      <ProductListSectionHome
        title="All Time Best Sellers"
        loading={loading}
        products={bestSeller}
      />

      <Container maxW={"8xl"} centerContent>
        <Image
          src={require("../assets/home/Apple_cider.jpg")}
          onClick={() => navigate("/products/1550")}
          cursor={"pointer"}
        />
      </Container>
      <Container maxW={"container.xl"} px={0} py={6} centerContent>
        <Image src={require("../assets/home/perfect_tea.jpg")} />
        <Grid
          templateColumns={{
            md: "repeat(3, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gap={10}
          my={4}
          px={"10%"}
        >
          {Details.map((data) => (
            <GridItem>
              <Flex
                gap={3}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"center"}
              >
                <Image src={data.image} w={100} />

                <Text color={"brand.500"} fontWeight={600} fontSize={"22px"}>
                  {data.title}
                </Text>
                <Text
                  textAlign={"justify"}
                  fontSize={"16px"}
                  color={"text.300"}
                >
                  {data.content}
                </Text>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Container maxW={"container.xl"}>
        <Heading
          color="brand.500"
          size="lg"
          mx="auto"
          align={"center"}
          mt={3}
         
        >
          BLOGS
        </Heading>

        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          px={2}
          py={3}
          spacing="40px"
        >
          {blogs?.slice(0, 8).map((blog) => (
            <GridItem key={blog.id} m={4}>
              <Card>
                <LinkBox h={400}>
                  <Image
                    src={blog.banner}
                    w="100%"
                    h="300px"
                    loading="lazy"
                    objectFit={"cover"}
                    borderRadius={5}
                    style={{
                      opacity: 1,
                      transition: "opacity 0.7s", // Note the corrected syntax here
                    }}
                  />
                  <LinkOverlay
                    _hover={{ color: "text.500" }}
                    href={`/blogs/${blog.id}/`}
                  >
                    <Heading size="sm" fontWeight={500} m={2}>
                      {blog.title}
                    </Heading>
                  </LinkOverlay>
                </LinkBox>
                <Flex m={2} justifyContent={"space-between"}>
                  <Text fontSize={"sm"} color="gray.500">
                    {new Intl.DateTimeFormat("en-CA", {
                      dateStyle: "long",
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(blog.published_at))}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"brand.500"}
                    onClick={() => navigate(`/blogs/${blog.id}/`)}
                    cursor={"pointer"}
                  >
                    Read more
                    <ChevronRightIcon />
                  </Text>
                </Flex>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Container bgColor={"#E6E6E6"} maxW={"container.xl"} py={2}>
        <SimpleGrid
          columns={[2, 3, null, 6]}
          px={6}
          maxW={"container.xl"}
          my={6}
          align="center"
          spacingX={{ base: "10vw", md: "30px" }}
          spacingY="40px"
        >
          <Stat>
            <StatNumber color="text.500" fontSize={{ base: "3xl", md: "3xl" }}>
              16+
            </StatNumber>
            <StatHelpText color="gray.600">Natural Products</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.500" fontSize={{ base: "3xl", md: "3xl" }}>
              10258+
            </StatNumber>
            <StatHelpText color="gray.600">Satisfied Clients</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.500" fontSize={{ base: "3xl", md: "3xl" }}>
              1485+
            </StatNumber>
            <StatHelpText color="gray.600">Cities & Towns</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="text.500" fontSize={{ base: "3xl", md: "3xl" }}>
              7+
            </StatNumber>
            <StatHelpText color="gray.600">Countries</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.500" fontSize={{ base: "3xl", md: "3xl" }}>
              15+
            </StatNumber>
            <StatHelpText color="gray.600">Stores</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              11<sup>th</sup>
            </StatNumber>
            <StatHelpText color="gray.600">Generation of Farmers</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        {/* <Box
          w="100%"
          backgroundImage={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"
          }
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            mb={"5"}
            mt={3}
            pb={"10px"}
          >
            BRAND PARTNERS
          </Heading>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            xl: "repeat(6,1fr)",
          }}
          spacing={{ base: 10, md: 14 }}
          py={3}
          px={{ base: 15, md: 20, lg: 24 }}
        >
          {brands?.map((brand, index) => (
            <GridItem as={RouterLink} to={brand?.href ?? "#"}>
              <Image
                as={LazyLoadImage}
                key={index}
                src={brand.src}
                boxSize={{
                  base: "150px",
                  md: "150px",
                  lg: "180px",
                }}
                alt={brand.alt}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </GridItem>
          ))}
        </Grid> */}
        <Box
          w="100%"
          // backgroundImage={
          //   "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"
          // }
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:24}}
            mx="auto"
            align={"center"}
            mt={8}
            mb={1}
            pb={"10px"}
          >
            AWARDS & CERTIFICATES
          </Heading>
        </Box>
        <Text mb={5} textAlign={"center"} color="text.300">
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
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/global-certificate.jpg"
            }
            alt="global-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/ciolook-certificate.jpg"
            }
            alt="ciolook-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:24}}
            mx="auto"
            align={"center"}
            my={"5"}
            
          >
            LICENSES & AFFILIATIONS
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
          px={{md:"11%"}}
          alignItems={"center"}
        >
          {Licences.map((data) => (
            <GridItem>
              <Image mx={"auto"} src={data.src} boxSize={{base:130,md:data.size}} />
            </GridItem>
          ))}
        </Grid>

        {/* <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5,1fr)",
          }}
          my={6}
          mx={{ md: "15%", base: 3 }}
        >
          {imageInfo?.map((data) => (
            <GridItem>
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <LazyLoadImage
                  cursor={"pointer"}
                  transition="all 1s ease"
                  _hover={{
                    transform: "scale(1.25)",
                  }}
                  src={data.src}
                  alt={data.name}
                  style={{
                    opacity: 1,
                    transition: "opacity 0.7s",
                    width: "100px",
                    // Note the corrected syntax here
                  }}
                />
                <Text textAlign={"center"} fontSize={"14px"} mt={2}>
                  {data.name}
                </Text>
              </Flex>
            </GridItem>
          ))}
        </Grid> */}
        <Container maxW={"container.xl"} pt={15} pb={20} centerContent>
          <Image w={{md:"65%"}} src={require("../assets/home/himalayan_icon.jpg")} />

        </Container>
        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:20}}
            mx="auto"
            align={"center"}
            mb={7}
          >
            OUR SERVICES ARE AVAILABLE IN
          </Heading>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/Map.webp"
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
        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:22}}
            mx="auto"
            align={"center"}
            my={"5"}
            pb={"10px"}
          >
            AVAILABLE AT
          </Heading>
        </Box>
        <Container maxW={"container.xl"} mb={5} px={0} centerContent>
          <Image
            src={
              require("../assets/001.jpg")
            }
            w={"container.xl"}
            alt=""
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Container>
      </Container>
      <ScrollToTop/>
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
