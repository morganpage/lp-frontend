import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withTheme } from "@emotion/react";


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
          textDecoration: "underline1",
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
      ".quote":{
        fontSize:"80px",
        color:"red.500"
      },
      hr:{
        margin:"22px 0"
      },
      ".testimonial": {
        p: {
          fontSize:"2xl"
        }
      },
      ".card" : {
        padding:"20px",
        backgroundColor:"white",
        boxShadow:"3px 3px 8px",
        cursor:"pointer",
        borderRadius:"5px"
      },
      ".card:hover" : {
        boxShadow:"5px 5px 10px",
        cursor:"pointer"
      },
      ".card:active" : {
        boxShadow:"5px 5px 10px",
        cursor:"pointer"
      },
      ".button" : { 
        fontWeight:"600",
        textDecoration:"none",
        color:"white",
        backgroundColor:"#319795",
        padding:"8px 18px",
        borderRadius:"6px"
      },
      ".button:hover" : {
        backgroundColor:"#2C7A7B",
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
