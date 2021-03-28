import { Flex,Box,Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "./image";

const Nav = ({global}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" maxWidth={1100} mx="auto" px={8}>
      <Box w={200} >
        <Link href="/"><a><Image image={global.logo}/></a></Link>
      </Box>
      <Box w={200} >
      <a href="https://blog.morganpage.tech"><Text fontWeight="bold" fontSize="1.3em" color={"gray.600"}  textAlign="right">BLOG</Text></a>
      </Box>
    </Flex>
  )
}

export default Nav;