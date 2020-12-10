import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  fonts: {
    body: process.env.NEXT_PUBLIC_FONT_FAMILY,
    heading: process.env.NEXT_PUBLIC_FONT_FAMILY,
    mono: process.env.NEXT_PUBLIC_FONT_FAMILY,
  },

  styles: {
    global: {
      fontFamily: process.env.NEXT_PUBLIC_FONT_FAMILY,
      ".markdown": {
        a: {
          textDecoration: "underline",
        },
        h1: {
          fontSize: "4xl",
          fontWeight: "bold",
          padding: "12px 0 12px 0",
        },
        h2: {
          fontSize: "2xl",
          fontWeight: "bold",
          padding: "12px 0 2px 0",
        },
        h3: {
          fontSize: "xl",
          fontWeight: "bold",
          padding: "12px 0 2px 0",
        },
        h4: {
          fontSize: "md",
          fontWeight: "semibold",
          padding: "0 0 14px 0",
        },
        p: {
          margin: "0px 0 12px 0",
          fontSize:"20px"
        },
        ul: {
          padding: "0px 0 8px 28px"
        }
      },
      ".box": {
        borderRadius: "0px",
        border: "2px solid #333",
        padding: "10px",
      },
      hr:{
        margin:"22px 0"
      },
      ".testimonial": {
        p: {
          fontSize:"2xl"
        }
      }
    },
  },
});




function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
