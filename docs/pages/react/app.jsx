import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import ScrubExample from './scrub-example'
import TapExample from './tap-example'

function App() {
  const [tab, setTab] = useState(location.hash.replace(/#/, '') || 'scrub')
  return (
    <div className='app'>
      <h1>React Fpoint</h1>
      <p>A set of react components make mouse and touch experience easier</p>
      <nav>
        {['scrub', 'tap'].map(tab => (
          <span 
            className='tab' 
            key={tab} 
            onClick={() => { setTab(tab); location.hash = `#${tab}` }}
          >
            {tab}
          </span>
        ))}
      </nav>
      <p className='intro'>
        Checkout the github.com/huozhi/fpoint project for details that how it works internally and why I design this. In a short word it provides you the easy way to handle the mouse and touch interactions individually and flexibly. unlike browser throwing you bunch of native events (pointer, mouse and touch events), fpoint understands how to capture user inputs and recognize them as an action, with the original input source identified.
      </p>
      {tab === 'scrub' && <ScrubExample />}
      {tab === 'tap' && <TapExample />}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
