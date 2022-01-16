import React, {forwardRef, useRef, useEffect} from 'react'
import {ftap} from 'fpoint'
import combineRefs from './lib/combine-refs'
import {createHandlerProxy} from './common'
import {TapProps, HandlerMap} from './@types'

const Tap = forwardRef(function Tap(props : TapProps, ref) {
  const {
    component: Component = 'div',
    onTouchDown,
    onTouchUp,
    onTouchClick,
    onMouseDown,
    onMouseUp,
    onMouseClick,
    onHoverEnter,
    onHoverLeave,
    ...rest
  } = props
  const innerRef = useRef(null)
  const handlers = {
    onTouchDown,
    onTouchUp,
    onTouchClick,
    onMouseDown,
    onMouseUp,
    onMouseClick,
    onHoverEnter,
    onHoverLeave,
  }
  
  const handlersRef = useRef(handlers as HandlerMap)
  handlersRef.current = handlers as HandlerMap
  const proxyHandler = createHandlerProxy(handlersRef.current)
  
  useEffect(() => {
    const dom = innerRef.current as unknown as HTMLElement
    const relase = ftap(dom, {
      onTouchDown: proxyHandler('onTouchDown'),
      onTouchUp: proxyHandler('onTouchUp'),
      onTouchClick: proxyHandler('onTouchClick'),
      onMouseDown: proxyHandler('onMouseDown'),
      onMouseUp: proxyHandler('onMouseUp'),
      onMouseClick: proxyHandler('onMouseClick'),
      onHoverEnter: proxyHandler('onHoverEnter'),
      onHoverLeave: proxyHandler('onHoverLeave'),
    })
    return relase
  }, [])
  
  return <Component {...rest} ref={combineRefs(ref, innerRef)} />
})

Tap.defaultProps = {
  onTouchDown() {},
  onTouchUp() {},
  onTouchClick() {},
  onMouseDown() {},
  onMouseUp() {},
  onMouseClick() {},
  onHoverEnter() {},
  onHoverLeave() {},
}

export default Tap

