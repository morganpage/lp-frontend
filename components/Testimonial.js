import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

export default function Testimonial({ children , quoter }) {
  return (
    <Box bg="white" rounded="lg" boxShadow="md" p={8} m={4} maxWidth={800} >
      <Flex direction="column">
        <Flex py={4}>
          <Text lineHeight={0} position="relative" top={12} fontSize="200px" color="gray.300">
            “
          </Text>
          <Box>{children}</Box>
          <Text alignSelf="flex-end" lineHeight={0} position="relative" top={12} fontSize="200px" color="gray.300">
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
