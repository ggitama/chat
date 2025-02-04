import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/vendors/gaxon/styles.css" />
          <link rel="stylesheet" href="/vendors/flag/sprite-flags-24x24.css" />
          <link rel="stylesheet" href="/vendors/noir-pro/styles.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendors/react-notification/react-notifications.css"
          />
          <script
            src="https://kit.fontawesome.com/b0c7c54a7b.js"
            crossOrigin="anonymous"
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
