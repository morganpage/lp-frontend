import { Box, Flex, Text, Spacer, Heading, Button, Link  } from "@chakra-ui/react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Head from "next/head";
import EmailFormNetlify from "../components/EmailFormNetlify";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { fetchAPI, getStrapiMedia } from "../lib/api";
import marked from "marked";
import Testimonial from "../components/testimonial";
import Image from "../components/image";
import { useState } from "react";

export default function Home({ global, homepage, emailform, testimonials, markups }) {
  let shareImage = getStrapiMedia(homepage.shareImage);
  let backgroundImage = getStrapiMedia(homepage.backgroundImage);
  let maxWidth = 1450;
  let px = 8;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSuccess, setShowSuccess] = useState(false);

  let handleButtonClick = () => {
    onOpen();
  };

  return (
    <>
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
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />
          {!showSuccess ? (
            <EmailFormNetlify
              emailform={emailform}
              hideShadow
              onSuccess={() => {
                setShowSuccess(true);
              }}
            />
          ) : (
            <Box textAlign="center" p={8}>
              <Heading textColor="#15B4A8">Success...</Heading>
              <Text fontWeight="bold" pt={8}>Your Free <span style={{color:"#2AD3C7"}}>5 Reasons To add VR to your training Whitepaper</span> will arrive in your email inbox within 5 minutes.</Text>
              <Text fontWeight="bold" py={8}>While you wait, please answer these super-short questions so that we can determine if we can help.</Text>
              <Link  _hover ={{textDecoration:"none"}} href="https://dualgoodhealth.typeform.com/to/LtKNJ0IF"><Button  colorScheme={"purple"} px={8}>Start</Button></Link>
            </Box>
          )}
        </ModalContent>
        {/* <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          <EmailFormNetlify emailform={emailform} />
          </ModalBody>

        </ModalContent> */}
      </Modal>

      <Box bg={homepage.backgroundColor} height1="100%">
        <Box backgroundSize="cover" bgPos="center top" bgRepeat="no-repeat" bgImage={`url('${backgroundImage}')`}>
          <Box px={px} maxWidth={maxWidth} mx="auto" py={8}>
            <Nav global={global} handleButtonClick={handleButtonClick} />

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
              {markups
                ?.filter((m) => m.section === "Top")
                .map((markup, index) => (
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
          <Button onClick={handleButtonClick} colorScheme={"purple"} p={10} flexDirection="column">
            <Text fontSize="xl">GET STARTED</Text>
            <Text display={{ base: "none", lg: "block" }} fontWeight="normal" fontSize="md">
              with a FREE pilot which you can do in less than a month!
            </Text>
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

        <Box>
          <Box p={px} maxWidth={maxWidth} mx="auto">
            {markups
              ?.filter((m) => m.section === "Bottom")
              .map((markup, index) => (
                <Box key={index} px={px} py={{ lg: px }}>
                  <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(markup.description) }}></div>
                </Box>
              ))}

            <Flex justifyContent="space-around">
              <Button onClick={handleButtonClick} colorScheme={"purple"} p={10} flexDirection="column">
                <Text fontSize="xl">GET STARTED</Text>
                <Text display={{ base: "none", lg: "block" }} fontWeight="normal" fontSize="md">
                  with a FREE pilot which you can do in less than a month!
                </Text>
              </Button>
            </Flex>
          </Box>
        </Box>

        <Footer global={global} />
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const [global, homepage, emailform, links, testimonials, markups] = await Promise.all([
    await fetchAPI("/global"),
    await fetchAPI("/homepage"),
    await fetchAPI("/emailform"),
    await fetchAPI("/links"),
    await fetchAPI("/testimonials"),
    await fetchAPI("/markups?_sort=id:ASC"),
  ]);
  global.groupedLinks = links.reduce((hash, obj) => ({ ...hash, [obj["group"]]: (hash[obj["group"]] || []).concat(obj) }), {});
  return {
    props: { global, homepage, emailform, testimonials, markups },
  };
}
