import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReadMorePost from "../components/ReadMorePost";
import { Box, Container, Text } from "@chakra-ui/react";
import BreadCrumbCom from "../components/BreadCrumbCom";

const Posts = [
  {
    image: require("../assets/inspire-support/b2.jpg"),
    title: "Bansi Gir Gaushala",
    content: (
      <Text>
        Bansi Gir Gaushala was established in 2006 by Shri Gopalbhai Sutariya as
        an effort to revive, regain and re-establish Bharat’s ancient Vedic
        culture. In Vedic traditions, the Cow was revered as Divine Mother, the
        Gomata or Gaumata, and one which bestows health, knowledge, and
        prosperity. In Sanskrit, the word “Go” also means “Light”.
        <br />
        <br />
        But as time passed and humanity entered the Dark Age (“Kali Yuga”), much
        of this wisdom was lost. In modern times, Gaumata has become a victim of
        human greed.
      </Text>
    ),

    href: "https://www.bansigir.in/",
  },
  {
    image: require("../assets/inspire-support/b1.jpg"),
    title: "Gir Gauveda",
    content: (
      <Text>
        <b>Bansi Gir Gauveda</b> is on a mission to serve humanity by offering
        highly potent Ayurvedic supplements by exploiting synergies of Cow
        (“Gau” or “Go”) rearing and Ayurveda. We are part of Bansi Gir Gaushala,
        a leading centre of excellence in Gopalan (Gau rearing and breeding),
        and research into Ayurveda and Natural farming.
        <br />
        <br />
        <b>Gaumata </b>is regarded very highly in ancient Bharatiya (Indian)
        culture and Ayurveda, and its products are considered to be extremely
        potent, especially when combined with Ayurvedic herbs.
      </Text>
    ),
    href: "https://www.girgauveda.com/",
  },
  {
    image: require("../assets/inspire-support/b5.jpg"),
    title: "Sidha Kisan Se",
    content: (
      <Text>
        SIDHA KISAN SE is inspired by Bansi Gir Gaushala, and it's work towards
        the revival of Bharat's ancient Gau Sanskriti. SIDHA KISAN SE intends to
        transform the way food is bought and sold in the country by bringing
        farmers and consumers closer to each other
        <br />
        <br />
        Under the SIDHA KISAN SE initiative, Suryan Organic offers you an
        opportunity to buy genuine, pure and authentic natural commodities
        directly from farmers who are part of our growing network of thousands
        of trusted and ethically growing natural farmers
      </Text>
    ),
    href: "https://www.sidhakisanse.com/",
  },
  {
    image: require("../assets/inspire-support/b3.jpg"),
    title: "SOSE",
    content:
      "We are an Ethical & Natural foods, natural home care and handmade personal care brand from the house of Suryan Organic. We were born out of the need to start at the beginning, to go to the roots of our problems. As an enterprise that is inspired by the mission of Bansi Gir Gaushala, our aim is to contribute to the revival of “Gau Sanskriti”, an ancient culture which placed the Gaumata (Cow as the Divine Mother) at the center of all economic, cultural and social activity. Agriculture is the foundation of such a culture, and it is with this paradigm that we seek to find solutions to the problems facing Bharat and humanity at large.",
    href: "https://www.sose.in/",
  },
  {
    image: require("../assets/inspire-support/b4.jpg"),
    title: "GoTirth Vidyapeeth",
    content:
      "The education philosophy of ancient India was influenced by religion itself. The aim of education was to awaken the instinct of righteousness. Education was for religion, meaning, lust and salvation. Their gradual development was the only goal of education. It was the first place of religion. Opporting religion to gain meaning was to block the path to attain salvation. Moksha was the ultimate goal of life and this was also the ultimate goal of education.",
    href: "https://www.gotirthvidyapeeth.in/",
  },
];


export default function InspireSupport() {
  return (
    <>
      <Navbar />

      <Container maxW="container.xl">
        <BreadCrumbCom
          second={"inspire-support"}
          secondUrl={"/inspire-and-support"}
        />{" "}
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} >
      <Box
        w={"100%"}
        bgImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/inspire and support.jpg"}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={"-10px"}
        py={20}
        boxShadow={"0px 0px 0px 0px"}
        backdropFilter="blur(10px)"
        height={"550px"}
        // mb={10}
      >
        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          textShadow={"lightgreen"}
          fontSize="6xl"
          fontWeight="700"
        >
   inspire-support
        </Text>
      </Box>
      </Container>
      <Container maxW={"6xl"} py={4}>
        {Posts.map((postDetails) => (
          <ReadMorePost postAlign="horizontal" postDetails={postDetails} />
        ))}
      </Container>
      <Footer />
    </>
  );
}
