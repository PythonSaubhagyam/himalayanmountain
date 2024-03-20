import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import { Box, Container, VStack, Image, Text,Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
const Aboutus = () => {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  return (
    <>
      {IsMobileView !== "true" && <Navbar />}
      <Container maxW={"container.xl"} alignContent={"flex-start"}>
        <BreadCrumbCom second={"About Us"} secondUrl={"/about-us"} />{" "}
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} centerContent>
        <Image src={require("../assets/aboutus/about-us.jpg")} />
        <VStack>
          <Image
            my={7}
            w={"45%"}
            src={require("../assets/aboutus/2 raw.png")}
          />
          <Box
            fontWeight={"600"}
            color="text.500"
            fontSize={"32px"}
            alignContent={"flex-start"}
            mb={7}
          >
            Our Mission & Vision
          </Box>

          <Box maxW={"6xl"} color={"text.300"} textAlign={"justify"}>
            When you buy this blend , you also support ethical farming
            practices, and farmers who work hard under tough hilly or
            mountainous conditions to bring you authentic products without
            harming Mother Nature.
            <br />
            <br />
            Himalayan mountain draws inspiration From "Bansi Gir Gaushala", and
            its work towards reviving Bharat’s ancient “Gau Sanskriti”. We
            believe ancient Bharat holds the solution to many of the challenges
            facing humanity today.
            <br />
            <br />
            Himalayan mountain mission is to change the way people think about
            food and beverage, bringing simple Natural & Ayurvedic wisdom back
            into people’s lives. Our brand aims to recreate the same purity and
            authenticity that is characteristic of ancient Bharat.While doing
            so, we help people empower farmers who are the cornerstone of
            "Bharatiya & Gau Sanskriti".
            <br />
            <br />
            In Ayurvedic principles , caffeine is typically associated with Vata
            dosha,which is again associated with Vayu, a primal element that
            represents movement. Therefore, small amounts of caffeine can
            instantly make you feel energetic. However, in higher doses for
            sustained periods, caffeine consumption can trigger adverse health
            conditions. For this reason, please enjoy caffeine drinks in
            moderation.
            <br />
            <br />
            To help you reduce caffeine dependence , you may enjoy our range of
            Himalayan Mountain Ethical & Natural Tea blends that can help you
            stay fresh, energetic and healthy throughout the day. Each of these
            blends is created with authentic Ayurvedic herbs keeping certain
            health benefits in mind.
            <br />
            <br />
            Our herbs are sourced as far as possible from Dakshin Bharat, a
            region which continues to be a flag bearer of ancient Ayurvedic
            practice. These herbs are added in perfect proportions to give you a
            refreshing delectable taste.
          </Box>

          <br />
          <Box
            maxW={"6xl"}
            fontWeight={"600"}
            color="text.500"
            fontSize={{ base: "20px", lg: "32px" }}
          >
            How Is Himalayan Mountain Tea Produced?
          </Box>
         
         <Image src={require("../assets/aboutus/how to precroes tea.jpg")} w={"70%"} />
         <Box
          w="100%"
        
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            my={"5"}
            pb={"10px"}
          >
            AVAILABLE AT
          </Heading>
        </Box>
     
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/01.jpg"
            }
            
            alt=""
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </VStack> 
       
        
      </Container>
      {IsMobileView !== "true" && <Footer />}
    </>
  );
};

export default Aboutus;
