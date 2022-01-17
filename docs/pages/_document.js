import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property='og:title' content='fpoint' />
        <meta property="og:description" content="Make web interaction easy" />
        <meta property='og:image' content={`https://fpoint.vercel.app/og.png?v=1`} />

        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

