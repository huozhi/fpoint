import { useState, useRef } from 'react'
import { Tap, Scrub } from 'fpoint/react'

function Cube({x = 0, y = 0, isActive = false}) {
  return (
    <div 
      className={`cube cube--${isActive ? 'active' : 'silent'}`} 
      style={{
        transform: `translateZ(-100px) rotate(${x}deg) rotateY(${y}deg)`,
      }}
    >
      <style jsx>{`.cube {
        width: 200px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
        transform: translateZ(-100px);
        transition: transform 1s;
      }
      
      .cube__face {
        position: absolute;
        width: 200px;
        height: 200px;
        border: 2px solid black;
        line-height: 200px;
        font-size: 40px;
        font-weight: bold;
        color: white;
        text-align: center;
      }

      .cube--active .cube__face--front,
      .cube--active .cube__face--left {
        background-color: rgba(151, 239, 255, 0.3);
      }
      
      .cube__face--front  { background: rgba(230, 230, 230, 0.4); }
      .cube__face--right  { background: rgba(230, 230, 230, 0.4); }
      .cube__face--top    { background: rgba(230, 230, 230, 0.4); }
      .cube__face--back   { background: rgba(255, 255, 255, 0.1); }
      .cube__face--left   { background: rgba(230, 230, 230, 0.1); }
      .cube__face--bottom { background: rgba(230, 230, 230, 0.1); }
      
      .cube__face--front  { transform: rotateY(  0deg) translateZ(100px); }
      .cube__face--right  { transform: rotateY( 90deg) translateZ(100px); }
      .cube__face--back   { transform: rotateY(180deg) translateZ(100px); }
      .cube__face--left   { transform: rotateY(-90deg) translateZ(100px); }
      .cube__face--top    { transform: rotateX( 90deg) translateZ(100px); }
      .cube__face--bottom { transform: rotateX(-90deg) translateZ(100px); }
      `}</style>
      <div className="cube__face cube__face--front" />
      <div className="cube__face cube__face--back" />
      <div className="cube__face cube__face--right" />
      <div className="cube__face cube__face--left" />
      <div className="cube__face cube__face--top" />
      <div className="cube__face cube__face--bottom" />
    </div>
  )
}

function TapExample() {
  const [glitterState, setGlitterState] = useState({visible: false})
  const [position, setPosition] = useState({x: 0, y: 0})
  const ref = useRef(null)
  
  function setGlitterPosition(event, type) {
    const {offsetX, pageY} = event
    setPosition({x: offsetX + ref.current.offsetLeft, y: pageY - ref.current.offsetTop})
    setGlitterState({type, visible: true})
  }
  
  return (
    <div className='tap-example'>
      <style jsx>{`
      .tap-example {
        position: relative;
      }
      
      .square {
        margin: 120px 60px;
        width: 200px;
        height: 400px;
        border: 3px solid #fff;
      }
      
      @keyframes flick {
        0% {
          opacity: 0.3;
          transform: scale(1);
        }
        10% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
      
      .glitter {
        position: absolute;
        border-radius: 50%;
        background: #fff;
        width: 40px;
        height: 40px;
        transform-origin: center;
      }
      .glitter--touch {
        background: #000;
        border: 2px solid #fff;
      }
      .glitter--animating {
        animation: flick 0.3s ease-out;
      }`}</style>
      <h2>Example</h2>
      <small>Use mouse or finger (touch screen) to click the square area. Fingerprint will be solid circle when doing mouse click or a hollow circle when you touch it</small>
      <Tap
        ref={ref}
        className='square'
        onTouchClick={(e) => { setGlitterPosition(e, 'touch') }}
        onMouseClick={(e) => { setGlitterPosition(e, 'mouse') }}
      >
        <div
          style={{
            visibility: glitterState.visible ? 'visible' : 'hidden',
            left: (position.x - 20) + 'px',
            top: (position.y - 20) + 'px',
          }}
          className={
            `glitter ${glitterState.type ? `glitter--${glitterState.type}` : ''} ${glitterState.visible ? 'glitter--animating' : ''}`
          } 
          type={glitterState.type}
          onAnimationEnd={() => {
            setGlitterState({visible: false})
          }}
        />
      </Tap>
       
      <code>
        <pre>
          {`
import {Tap} from 'fpoint/react'

function handleTouchClick(e) {
  const {offsetX, offsetY} = e
  // ...
}

function handleMouseClick(e) {
  // ...
}

return (
  <Tap
    onTouchClick={handleTouchClick}
    onMouseClick={handleMouseClick}
  >
    {children}
  </Tap>
)
`}
        </pre>
      </code>
    </div>
  )  
}

const throttle = (fn, wait) => {
  let pending = false
  return function() {
    if (pending) return;
    fn.apply(this, arguments)
    pending = true
    setTimeout(
      () => pending = false,
      wait
    )
  }
}

function ScrubExample() {
  const [posState, setPosState] = useState({ pageX: 0, pageY: 0, offsetX: 0, offsetY: 0 })
  const [hovering, setHovering] = useState(false)
  const scrubRef = useRef(null)
  function extractPos(e) {
    const parentBcr = scrubRef.current.getBoundingClientRect()

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const pageY = e.touches ? e.touches[0].pageY : e.pageY


    const offsetX = Math.min(Math.max(0, pageX - parentBcr.left), parentBcr.width)
    const offsetY = Math.min(Math.max(0, pageY - parentBcr.top), parentBcr.height)
    return {pageX, pageY, offsetX, offsetY}
  }
  
  const onScrubMove = throttle((e) => { 
    const posState = extractPos(e)

    setPosState(posState)
  }, 200)
  
  const onHoverMove = throttle((e) => {
    setHovering(true) 
  })
  
  const onHoverEnd = () => setHovering(false)
  
  const isBrowser = typeof window !== 'undefined'
  const leftPercent = isBrowser ? posState.offsetX / document.body.clientWidth * 100 : 0
  const topPercent = isBrowser ? (posState.offsetY / document.body.clientHeight) * 100 : 0

  return (
    <div>
      <style jsx>{`
      .scrub-example {
        margin: auto;
        position: relative;
        padding: 40px;
        perspective: 400px;
        width: 400px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .scrub-example .cube {
        margin: auto;
      }
      `}</style>
      <h2>Example</h2>
      <small>Use mouse or finger (touch screen) to scrub the cube to rotate. colors change while hovering with mouse but not touch</small>
      <Scrub
        ref={scrubRef}
        onScrubMove={onScrubMove}
        onHoverMove={onHoverMove}
        onHoverEnd={onHoverEnd}
      >
        <div className='scrub-example'>
          <Cube
            isActive={hovering} 
            x={Math.floor(leftPercent / 100 * 360)} 
            y={Math.floor(topPercent / 100 * 360)} 
          />
        </div>
      </Scrub>
      
      <h2>Usage</h2>
      <code>
        <pre>
          {`
import {Scrub} from 'fpoint/react'

function handleScrubMove(e) {
  const pageX = e.touches ? e.touches[0].pageX : e.pageX
  const pageY = e.touches ? e.touches[0].pageY : e.pageY
  
  // ...
}

return (
  <Scrub
    onScrubMove={handleScrubMove}
  >
    {children}
  </Scrub>
)
`}
        </pre>
      </code>
    </div>
  )
}



export default function App() {
  const [tab, setTab] = useState((typeof location !== 'undefined' ? location.hash.replace(/#/, '') : null) || 'scrub')
  return (
    <div className='app'>
      <style dangerouslySetInnerHTML={{ __html: `
      html {
        font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
        background-color: #000000;
        color: #fff;
      }
      `}} />
      <style jsx>{`
      .intro {
        color: #ccc;
        font-size: 12px;
        line-height: 1.5;
      }      
      .app {
        padding: 32px 16px;
        margin: auto;
        max-width: 640px;
        min-height: 100vh;
      }
      
      .github__link {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 2;
      }`}</style>
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
