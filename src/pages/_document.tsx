import { Head, Html, Main, NextScript } from 'next/document';

const description =
  'Rick and Morty 3D Gallery Built with react-three-fiber and Next.js';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="language" content="english" />
        <meta httpEquiv="content-type" content="text/html" />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
