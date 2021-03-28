import { Box, Flex,  Spacer,  } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { fetchAPI, getStrapiMedia } from "../lib/api";
import marked from "marked";
import Testimonial from "../components/Testimonial";

export default function Subscribed({ global, homepage, markups, testimonials }) {
  let shareImage = getStrapiMedia(homepage.shareImage);
  return (
    <Box bg={homepage.backgroundColor} height="100%">
      <Box px={8} pt={8} maxWidth={1280} mx="auto">
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

        {markups.map( (markup,index) => markup.section ==="SubscribedTop" && (<Box key={index}><div className="markdown" dangerouslySetInnerHTML={{ __html: marked(markup.description) }}></div></Box>))}

        {testimonials.map((t, index) => (
          <Flex key={index}>
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
  const [global, homepage, markups, links, testimonials] = await Promise.all([
    await fetchAPI("/global"),
    await fetchAPI("/homepage"),
    await fetchAPI("/markups"),
    await fetchAPI("/links"),
    await fetchAPI("/testimonials"),
  ]);
  global.groupedLinks = links.reduce((hash, obj) => ({ ...hash, [obj["group"]]: (hash[obj["group"]] || []).concat(obj) }), {});
  return {
    props: { global, homepage, markups, testimonials },
  };
}
