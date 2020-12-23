import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    let fontLink = process.env.NEXT_PUBLIC_FONT_LINK ||"https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;900&display=swap";
    return (
      <Html>
        <Head>

          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href={fontLink} rel="stylesheet"/>
          
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_MEASUREMENT_ID}');
              `
            }}
          />



        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
