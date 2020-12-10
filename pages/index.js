import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import EmailFormNetlify from "../components/EmailFormNetlify";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { fetchAPI, getStrapiMedia } from "../lib/api";
import marked from "marked";
import Testimonial from "../components/Testimonial";

export default function Home({ global, homepage, emailform, testimonials }) {
  let shareImage = getStrapiMedia(global.logo);
  return (
    <Box bg={homepage.backgroundColor}>
      <Box maxWidth={1024} mx="auto">
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

        <Nav global={global} />

        <Flex flexWrap="wrap">
          <Box w={{ lg: "50%", sm: "100%" }} px={6} py={4} h="100%">
            <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(homepage.content || "Set up your homepage!") }}></div>
          </Box>
          <Box w={{ lg: "50%", sm: "100%" }} px={6} py={4}>
            <EmailFormNetlify emailform={emailform} />
          </Box>
        </Flex>

        {testimonials.map((t, index) => (
          <Flex>
            {index % 2 !== 0 && <Spacer />}
            <Testimonial quoter={t.quoter}>
            <div className="markdown testimonial" dangerouslySetInnerHTML={{ __html: marked(t.content) }}></div>
            </Testimonial>
          </Flex>
        ))}

        <Footer global={global} />
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const [global, homepage, emailform, links, testimonials] = await Promise.all([
    await fetchAPI("/global"),
    await fetchAPI("/homepage"),
    await fetchAPI("/emailform"),
    await fetchAPI("/links"),
    await fetchAPI("/testimonials"),
  ]);
  global.groupedLinks = links.reduce((hash, obj) => ({ ...hash, [obj["group"]]: (hash[obj["group"]] || []).concat(obj) }), {});
  return {
    props: { global, homepage, emailform, testimonials },
  };
}
