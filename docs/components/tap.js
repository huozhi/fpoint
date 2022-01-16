import { useEffect, useRef, useState } from 'react'
import { ftap } from 'fpoint'
import { Tap } from 'fpoint/react'

function TapExample() {
  const [glitterState, setGlitterState] = useState({visible: false})
  const [position, setPosition] = useState({x: 0, y: 0})
  const ref = useRef(null)
  
  function setGlitterPosition(event, type) {
    const {offsetX, pageY} = event
    setPosition({x: offsetX , y: pageY - ref.current.getBoundingClientRect().top - window.scrollY})
    setGlitterState({type, visible: true})
  }
  
  return (
    <div className='tap-example'>
      <style jsx>{`
      .tap-example {
        position: relative;
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
      <h2>Tap Example</h2>
      <small>Use mouse or finger (touch screen) to click the square area. Fingerprint will be solid circle when doing mouse click or a hollow circle when you touch it</small>
      <Tap
        ref={ref}
        className='square'
        style={{
          position: 'relative',
          margin: `20px 0`,
          width: `100%`,
          height: `200px`,
          border: `3px solid #fff`,
        }}
        onTouchClick={(e) => { setGlitterPosition(e, 'touch') }}
        onMouseClick={(e) => { setGlitterPosition(e, 'mouse') }}
      >
        <span
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


function FtapExample() {
  const [points, setPoints] = useState([])

  function flicking(e) {
    const { offsetX, offsetY } = e    
    const point = { pageX: offsetX, pageY: offsetY, isMouse: e instanceof window.MouseEvent }
    console.log(e)
    setPoints(points.concat(point))
  }
  
  function fading(isIn) {
    const fadingClsSelector = 'hover__pad--fading'
    const hoverPadNode = hoverPadRef.current
    if (isIn) {
      hoverPadNode.classList.add(fadingClsSelector)
    } else {
      hoverPadNode.classList.remove(fadingClsSelector)
    }
  }

  const touchPadRef = useRef()
  const hoverPadRef = useRef()

  useEffect(() => {
    ftap(touchPadRef.current, {
      onTouchClick(e) { flicking(e) },
      onMouseClick(e) { flicking(e) },
    })
    
    ftap(hoverPadRef.current, {
      onHoverEnter(e) {
        fading(true)
      },
      onHoverLeave(e) {
        fading(false)
      },
    })
  }, [])

  return (
    <>
      <style jsx>{`
    .root {
      padding: 36px 0;
      margin: auto;
      width: 690px;
    }
    .flex {
      display: flex;
    }
    .flex-vertical {
      flex-direction: column;
    }
    .touch__pad {
      position: relative;
      flex: 1 0 200px;
      opacity: 1;
      // background: #d9ffed;
      border: 3px solid #fff;
      margin-bottom: 20px;
      user-select: none;
      transition: all .3s ease-in;
    }
    .hover__pad {
      position: relative;
      flex: 1 0 200px;
      // background: #efebc8;
      border: 3px solid #fff;
      user-select: none;
    }
    .touch__point {
      position: absolute;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .touch__point--flicking {
      animation: flicking 0.7s ease-out;
    }
    .hover__pad--fading {
      opacity: .6;
    }
    .manifesto {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 100vw;
      font-size: 72px;
      pointer-events: none;
      color: #444;
      font-weight: bolder;
      text-transform: uppercase;
      font-family: sans-serif;
      user-select: none;
    }
    @keyframes flicking {
      0% {
        opacity: 0;
        width: 30px;
        height: 30px;
      }
      10% {
        opacity: 1;
        width: 40px;
        height: 40px;
      }
      100% {
        opacity: 0;
        width: 0px;
        height: 0px;
      }
    }
    .github__link {
      position: absolute;
      right: 20px;
      top: 36px;
      z-index: 2;
    }
    `}</style>
      <div className="root flex flex-vertical">
        <a className="github__link" href="https://github.com/huozhi/ulick">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
        <div className='flex flex-vertical'>
          <div className="touch__pad" ref={touchPadRef}>
            <span className="manifesto">click</span>
            {points.map(point => (
              <div
                key={point.pageY.toFixed(3).toString()}
                className={`touch__point touch__point--flicking`} 
                style={{
                  top: point.pageY + 'px',
                  left: point.pageX + 'px',
                  backgroundColor: point.isMouse ? 'aquamarine' : 'orange',
                }}
                onAnimationEnd={() => {
                  const nextPoints = points.slice().splice(points.indexOf(point), 1)
                  setPoints(nextPoints)
                }}
              />
            ))}
          </div>
          <div className="hover__pad" ref={hoverPadRef}>
            <span className="manifesto">hover</span>
          </div>
        </div>

        <h2>Usage</h2>
        <code>
          <pre>
          {`
import { ftap } from 'fpoint'

ftap(document.querySelector('.button'), {
  onTouchClick() {},
  onMouseClick() {},
  onHoverEnter() {},
  onHoverLeave() {},
})
`}
          </pre>
        </code>
      </div>
    </>
  )
}

export default function TapExamples() {
  return (
    <div>
      <TapExample />
      <FtapExample />
    </div>
  )
}