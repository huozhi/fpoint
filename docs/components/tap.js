import { useEffect, useRef, useState } from 'react'
import { ftap } from 'fpoint'
import { Tap } from 'fpoint/react'

function ReactTapExample() {
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
        pointer-events: none;
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

      <h2>Basic Example</h2>
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
    </div>
  )  
}


function TapExample() {
  const [points, setPoints] = useState([])

  function flicking(e) {
    const { offsetX, offsetY } = e    
    const point = { pageX: offsetX, pageY: offsetY, isMouse: e instanceof window.MouseEvent }
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
    <div className="flex flex-vertical">
      <style jsx>{`
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
      border: 3px solid #fff;
      margin-bottom: 20px;
      user-select: none;
      transition: all .3s ease-in;
    }
    .hover__pad {
      position: relative;
      flex: 1 0 200px;
      border: 3px solid #fff;
      user-select: none;
    }
    .touch__point {
      pointer-events: none;
      position: absolute;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .touch__point--flicking {
      animation: flicking 0.7s ease-out;
    }
    .hover__pad--fading {
      opacity: .4;
      background-color: #fff;
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
    `}</style>
      <h2>Tap & Click Example</h2>
      <p>Click or touch on pad area with CLICK text. Hover on another one with mouse. The effects will only show up when you do the right thing.</p>

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
                const nextPoints = points.slice()
                nextPoints.splice(points.indexOf(point), 1)
                setPoints(nextPoints)
              }}
            />
          ))}
        </div>
        <div className="hover__pad" ref={hoverPadRef}>
          <span className="manifesto">hover</span>
        </div>
      </div>
    </div>
  
  )
}

export default function TapExamples() {
  return (
    <div>
      <ReactTapExample />
      <TapExample />

      <h2>Usage</h2>

      <h4>{`ftap()`}</h4>
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

      <h4>Use with react</h4>
      <code>
        <pre>
          {`
import { Tap } from 'fpoint/react'

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