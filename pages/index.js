import { Box, Flex, Text, Spacer, Heading } from "@chakra-ui/react";
import Head from "next/head";
import EmailFormNetlify from "../components/EmailFormNetlify";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { fetchAPI, getStrapiMedia } from "../lib/api";
import marked from "marked";
import Testimonial from "../components/Testimonial";
import PlausibleProvider from 'next-plausible';

export default function Home({ global, homepage, markups, emailform, testimonials }) {
  let shareImage = getStrapiMedia(homepage.shareImage);

  return (
    <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}>
      <Box bg={homepage.backgroundColor} height="100%">
        <Box pt={8} >
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
          <Box bg="gray.900">
            <Box mt={8} maxWidth={1280} mx="auto" >

              {markups.map((markup, index) => markup.section === "IndexTop" && (<Box key={index} ><div className="markdown" dangerouslySetInnerHTML={{ __html: marked(markup.description) }}></div></Box>))}


              <Flex justifyContent="center" alignItems="center" flexWrap="wrap" flexDirection={{ lg: "row", base: "column-reverse" }}>
                <Box w={{ lg: "50%", sm: "100%" }} px={0} py={4} h="100%" display={{ lg: "block", base: "none" }}>
                  <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(homepage.content || "Set up your homepage!") }}></div>
                </Box>
                <Box w={{ lg: emailform.image ? "50%" : "33%", sm: "100%" }} px={0} py={4}>
                  <EmailFormNetlify emailform={emailform} />
                </Box>
              </Flex>

            </Box>
          </Box>

          <Box mt={8} maxWidth={1280} mx="auto" px={8}>
            {markups.map((markup, index) => markup.section === "IndexMiddle" && (<Box key={index}><div className="markdown" dangerouslySetInnerHTML={{ __html: marked(markup.description) }}></div></Box>))}

          </Box>

          <Box mt={8} maxWidth={1280} mx="auto" >

            {testimonials.map((t, index) => (
              <Flex key={index}>
                {index % 2 !== 0 && <Spacer />}
                <Testimonial quoter={t.quoter}>
                  <div className="markdown testimonial" dangerouslySetInnerHTML={{ __html: marked(t.content) }}></div>
                </Testimonial>
              </Flex>
            ))}
          </Box>
          <Footer global={global} />
        </Box>
      </Box>
    </PlausibleProvider>
  );
}

export async function getStaticProps() {
  const [global, homepage, markups, emailform, links, testimonials] = await Promise.all([
    await fetchAPI("/global"),
    await fetchAPI("/homepage"),
    await fetchAPI("/markups"),
    await fetchAPI("/emailform"),
    await fetchAPI("/links"),
    await fetchAPI("/testimonials"),
  ]);
  global.groupedLinks = links.reduce((hash, obj) => ({ ...hash, [obj["group"]]: (hash[obj["group"]] || []).concat(obj) }), {});
  return {
    props: { global, homepage, markups, emailform, testimonials },
  };
}
