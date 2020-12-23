import { Box, Flex, Text, Spacer, Heading, Button, VStack } from "@chakra-ui/react";
import Head from "next/head";
import EmailFormNetlify from "../components/EmailFormNetlify";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { fetchAPI, getStrapiMedia } from "../lib/api";
import marked from "marked";
import Testimonial from "../components/testimonial";
import Image from "../components/image";

export default function Home({ global, homepage, emailform, testimonials, markups }) {
  let shareImage = getStrapiMedia(homepage.shareImage);
  let backgroundImage = getStrapiMedia(homepage.backgroundImage);
  let maxWidth = 1280;
  let px = 8;
  return (
    <Box bg={homepage.backgroundColor} height1="100%">
      <Head>
        <title>{homepage.title}</title>
        <link rel="icon" href={getStrapiMedia(global.favicon)} />

        <meta property="og:title" content={homepage.title} />
        <meta name="twitter:title" content={homepage.title} />

        <meta name="description" content={homepage.description} />
        <meta property="og:description" content={homepage.description} />
        <meta name="twitter:description" content={homepage.description} />

        <meta property="og:image" content={shareImage} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="image" content={shareImage} />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Box backgroundSize="cover" bgPos="center top" bgRepeat="no-repeat" bgImage={`url('${backgroundImage}')`}>
        <Box px={px} maxWidth={maxWidth} mx="auto" py={8}>
          <Nav global={global} />

          <Flex flexWrap="wrap" flexDirection={{ lg: "row", sm: "column-reverse" }}>
            <Box w={{ lg: "50%", sm: "100%" }} px={0} py={4} h="100%">
              <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(homepage.content || "Set up your homepage!") }}></div>
            </Box>
            <Box w={{ lg: emailform.image ? "50%" : "33%", sm: "100%" }} px={0} py={4}>
              <EmailFormNetlify emailform={emailform} />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Box maxWidth={maxWidth} mx="auto" py={{ sm: px, lg: 0 }}>
          <Flex justifyContent="center" flexDirection={{ lg: "row", sm: "column" }} flexWrap="wrap">
            {markups?.map((markup, index) => (
              <Box key={index} w={{ lg: "50%", sm: "100%" }} px={px} py={{ lg: px }}>
                <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(markup.description) }}></div>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      <Box bgColor="#FFB000" textAlign="center" py={8} px="20%">
        <Heading>Get your FREE VR training pilot today</Heading>
        <Text fontSize="xl" p={8}>
          We have a LIMITED offer on our Virtual Reality BLS training demo, which we would love to offer to you completely FREE.
        </Text>
        <Button colorScheme={"purple"} p={10} flexDirection="column">
          <Text fontSize="xl">GET STARTED</Text>
          <Text display={{base:"none",lg:"block"}} fontWeight="normal" fontSize="md">with a FREE pilot which you can do in less than a month!</Text>
          {/* <Heading size="lg">GET STARTED</Heading>
          <Text>with a FREE pilot which you can do in less than a month!</Text> */}
        </Button>
      </Box>

      <Box backgroundSize="cover" bgPos="center top" bgRepeat="no-repeat" bgImage={`url('${backgroundImage}')`}>
        <Box px={px} maxWidth={maxWidth} mx="auto">
          {testimonials.map((t, index) => (
            <Flex key={index}>
              {index % 2 !== 0 && <Spacer />}
              <Testimonial quoter={t.quoter}>
                <div className="markdown testimonial" dangerouslySetInnerHTML={{ __html: marked(t.content) }}></div>
              </Testimonial>
            </Flex>
          ))}
        </Box>
      </Box>
      <Footer global={global} />
    </Box>
  );
}

export async function getStaticProps() {
  const [global, homepage, emailform, links, testimonials, markups] = await Promise.all([
    await fetchAPI("/global"),
    await fetchAPI("/homepage"),
    await fetchAPI("/emailform"),
    await fetchAPI("/links"),
    await fetchAPI("/testimonials"),
    await fetchAPI("/markups"),
  ]);
  global.groupedLinks = links.reduce((hash, obj) => ({ ...hash, [obj["group"]]: (hash[obj["group"]] || []).concat(obj) }), {});
  return {
    props: { global, homepage, emailform, testimonials, markups },
  };
}
