import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property='og:title' content='fpoint' />
        <meta property="og:description" content="Make web interaction easy" />
        <meta property='og:image' content={`/og.png`} />
        <meta property='og:type' content='website' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@fpoint' />
        <meta name='twitter:image' content={`/og.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

