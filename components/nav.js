import { Flex,Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "./image";

const Nav = ({global}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" maxWidth={1280} mx="auto">
      <Box w={200}>
        <Link href="/"><a><Image image={global.logo}/></a></Link>
      </Box>
      <Box w={200}>
        
      </Box>
    </Flex>
  )
}

export default Nav;