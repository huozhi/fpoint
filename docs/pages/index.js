import { useState } from 'react'
import Scrub from '../components/scrub'
import Tap from '../components/tap'

function Tabs() {
  const [tab, setTab] = useState((typeof location !== 'undefined' ? location.hash.replace(/#/, '') : null) || 'scrub')
  return (
    <div className='app'>
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
        {['fscrub', 'ftap'].map(tab => (
          <span 
            className='tab' 
            key={tab} 
            onClick={() => { setTab(tab); location.hash = `#${tab}` }}
          >
            {tab}
          </span>
        ))}
      </nav>
      <div className='tabs'>
        {tab === 'fscrub' && <Scrub />}
        {tab === 'ftap' && <Tap />}
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
        }
        .main-title {
          font-size: 4rem;
        }
        `
      }</style>
      <h1 className='main-title'>fpoint</h1>
      <br />
      <h1>APIs & Examples</h1>
      <Tabs />
    </div>
  )
}
