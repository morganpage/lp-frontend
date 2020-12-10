import { Box, Flex, Heading, Stack, Text, Link } from "@chakra-ui/react";

const Footer = ({ global }) => {
  let {groupedLinks,copyright} = global;
  return (
    <footer>
      <hr />
      <Flex pl={8} direction={{ md: "row", sm: "column" }}>
        {groupedLinks && Object.keys(groupedLinks).map((g,index) => (
          <Box key={index} minWidth="280px">
            <Heading fontSize="xl" mb={2}>{g}</Heading>
            <Stack>
              {groupedLinks[g].map(l =><Link key={l.name} href={l.url}>{l.name}</Link>)}
            </Stack>
          </Box>
        ))}
      </Flex>
      <Text textAlign="center" py={12}>
       {copyright}
      </Text>
    </footer>
  );
};

export default Footer;
