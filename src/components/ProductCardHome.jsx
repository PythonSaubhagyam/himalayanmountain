import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  CardFooter,
  Heading,
  Image,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const ProductCardHome = ({ product }) => {
  const navigate = useNavigate();
  const item = product?.product || {};
  const nameSlug = item.name?.replace(/\s+/g, "-").toLowerCase() || "product";
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <MotionCard
      my={5}
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      maxW="250px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bg="white"
      transition="box-shadow 0.3s ease, transform 0.3s ease"
      style={{ willChange: "transform" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => {
        navigate(`/products/${item.id}/${nameSlug}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      title={item.name}
    >
      <CardBody px={4} display="flex" justifyContent="center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform" }}
        >
          <Skeleton isLoaded={imageLoaded} borderRadius="md">
            <Image
              src={item.image1 || "/placeholder.png"}
              alt={item.name || "Product"}
              borderRadius="md"
              boxSize="200px"
              objectFit="contain"
              mx="auto"
              onLoad={() => setImageLoaded(true)}
            />
          </Skeleton>
        </motion.div>
      </CardBody>

      <CardFooter
        px={4}
        flexDirection="column"
        bg="bg.500"
        borderBottomRadius="lg"
        h="160px"
      >
        <Box
          h="70px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Heading size="sm" noOfLines={2} fontWeight="500" title={item.name}>
            {item.name || "Product Name"}
          </Heading>
        </Box>

        <Button
          as={Link}
          to={`/products/${item.id}/${nameSlug}`}
          fontSize="sm"
          w="100%"
          bg="brand.500"
          color="white"
          _hover={{ bg: "brand.900" }}
          title={`View ${item.name}`}
          onClick={(e) => e.stopPropagation()}
        >
          View Product
        </Button> 
      </CardFooter>
    </MotionCard>
  );
};

export default ProductCardHome;
