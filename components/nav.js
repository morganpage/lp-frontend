import { Flex,Box,Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "./image";

const Nav = ({global,handleButtonClick}) => {
  return (
    <Flex alignItems="flex-start" justifyContent="space-between">
      <Box w={200}>
        <Link href="/"><a><Image image={global.logo}/></a></Link>
      </Box>
      <Box>
        <Button onClick={handleButtonClick} colorScheme={"purple"}>Start a FREE pilot</Button>
      </Box>
    </Flex>
  )
}

export default Nav;