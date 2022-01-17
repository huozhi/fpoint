import { useState } from 'react'
import Head from 'next/head'
import Scrub from '../components/scrub'
import Tap from '../components/tap'

function Tabs() {
  const [tab, setTab] = useState('scrub')
  return (
    <div className='app'>
      <Head>
        <title>Fpoint | Easy Interaction</title>
        <meta property='og:title' content='fpoint' />
        <meta property="og:description" content="Make web interaction easy" />
        <meta property='og:image' content={`/fpoint.png`} />
        <meta property='og:type' content='website' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@huozhi' />
        <meta name='twitter:image' content={`/fpoint.png`} />
      </Head>
      <style jsx>{`
        nav>.tab:not(:first-child) {
          margin-left: 16px;
        }
        nav>.tab {
          user-select: none;
          text-decoration: underline;
          font-size: 18px;
        }
        .tabs {
          margin-top: 30px;
        }
      `}
      </style>
      <nav>
        {['scrub', 'tap'].map(tab => (
          <span 
            className='tab' 
            key={tab} 
            onClick={() => {
              setTab(tab);
            }}
          >
            {tab}
          </span>
        ))}
      </nav>
      <div className='tabs'>
        {tab === 'scrub' && <Scrub />}
        {tab === 'tap' && <Tap />}
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <div className="index">
      <style jsx>{
        `code pre {
          background: #fafafa;
          padding: 16px 8px;
        }

        .item-title {
          display: inline-block;
        }
        
        .index {
          margin: auto; max-width: 690px;
          padding: 0 16px;
        }
        .main-title {
          font-size: 4rem;
        }
        `
      }</style>
      <h1 className='main-title'>fpoint</h1>
      <h1>APIs & Examples</h1>
      <Tabs />
    </div>
  )
}


export async function getServerSideProps(ctx) {
  // console.log(ctx.req)
  return { props: { } }
}