import { Head, Html, Main, NextScript } from 'next/document'

const description = 'Rick and Morty 3D Gallery Built with react-three-fiber and Next.js'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />

        {/* Search Engine Optimization Meta Tags */}
        <meta name='description' content={description} />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />

        {/* Meta Tags for HTML pages on Mobile */}
        {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
        <meta name='viewport' content='width=device-width, minimum-scale=1, initial-scale=1.0' />
        <meta name='theme-color' content='#000' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
