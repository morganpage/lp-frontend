import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

export default function Testimonial({ children , quoter }) {
  return (
    <Box bg="white" rounded="lg" boxShadow="md" py={8} pr={{base:4,lg:8}} pl={{base:2,lg:8}} m={4} maxWidth={800} >
      <Flex direction="column">
        <Flex py={4}>
        <Text fontFamily="Palanquin Dark" mx={4} lineHeight={0} position="relative" top={{lg:12}} fontSize={{base:"100px",lg:"200px"}} color="gray.300">
            “
          </Text>
          <Box>{children}</Box>
          <Text fontFamily="Palanquin Dark" alignSelf="flex-end" lineHeight={0} position="relative" top={{base:6,lg:12}} fontSize={{base:"100px",lg:"200px"}} color="gray.300">
          ”
          </Text>
        </Flex>
        <Text fontSize="xl" fontWeight="bold" pt={8}>
          {quoter}
        </Text>
      </Flex>
    </Box>
  );
}
