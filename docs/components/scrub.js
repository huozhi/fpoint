import { fscrub } from 'fpoint'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Scrub } from 'fpoint/react'

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

function CubeExample() {
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

      <h2>Cube Example</h2>
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


function SliderExample() {
  const scrubRef = useRef()
  const indicatorRef = useRef()
  const blockRef = useRef()
  const [positions, setPositions] = useState({ pageX: 0, offsetX: 0, percent: 0 })
  const [status, setStatus] = useState('IDLE')
  const [isMouse, setIsMouse] = useState(true)
  const [isTouch, setIsTouch] = useState(true)
  const [isHover, setIsHover] = useState(false)

  function start(e) {
    setStatus('Scrub Start')
  }

  function move(e) {
    setPos(e)
    setStatus('Scrub Move')
  }

  function end(e) {
    setStatus('IDLE')
  }

  const setPos = useCallback((e) => {
    if (!scrubRef.current) return
    const parentBcr = scrubRef.current.getBoundingClientRect()

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const distance = pageX - parentBcr.left

    const offsetX = Math.min(Math.max(0, distance), parentBcr.width)

    setPositions({ pageX, offsetX, percent: offsetX / parentBcr.width })
  }, [setPositions])

  useEffect(() => {
    const release = fscrub(
      scrubRef.current,
      {
        onStart: start,
        onMove: move,
        onEnd: end
      },
      {
        mouse: isMouse,
        touch: isTouch,
        hover: isHover,
      }
    )
    return () => {
      release()
    }
  }, [isMouse, isTouch, isHover])

  return (
    <div>
      <style jsx>
        {`
        .scrub {
          margin: 60px 12px;
          width: 400;
          height: 12px;
          background: #fdfdfd;
          position: relative;
          touch-action: none;
          border-radius: 12px;
        }
        
        .scrub__head {
          width: 32px;
          height: 32px;
          margin-left: -12px;
          position: absolute;
          background: #e6b253;
          top: 50%;
          border-radius: 50%;
        }
        
        .scrub__indicator {
          position: absolute;
          left: 0;
          top: 0;
          height: 4px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background: #e6b253;
        }
        
        .togglers {
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
        }
        `}
      </style>
      
      <div className="scrub__indicator" ref={indicatorRef} style={{ width: typeof window === 'undefined' ? '0%' : `${100 * positions.percent}%` }} />
      <h2>Slider Example</h2>

      
      <div className="togglers">
        <div><input type="checkbox" checked={isMouse} onChange={(e) => setIsMouse(e.target.checked)} id="mouse-toggler" /> Enable Mouse</div>
        <div><input type="checkbox" checked={isTouch} onChange={(e) => setIsTouch(e.target.checked)} id="touch-toggler" /> Enable Touch</div>
        <div><input type="checkbox" checked={isHover} onChange={(e) => setIsHover(e.target.checked)} id="hover-toggler" /> Enable Hover</div>
      </div>
      <div>{status}</div>

      <div className="scrub" ref={scrubRef}>
        <div className="scrub__head" ref={blockRef} style={{ transform: `translate(${positions.offsetX}px, -50%)` }} />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="root">
      <style jsx>{`
        .github__link {
          position: absolute;
          right: 20px;
          top: 36px;
          z-index: 2;
        }`}
      </style>
      <a className="github__link" href="https://github.com/huozhi/fpoint">
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      </a>
      
      <CubeExample />
      <SliderExample />
              
      <h2>Usage</h2>
      <code>
        <pre>
        {`
import { fscrub } from 'fpoint'

fscrub(document.querySelector('.slider'), {
  onStart() {},
  onMove() {},
  onEnd() {},
})

`}
        </pre>
      </code>
    </div>
  )
}
