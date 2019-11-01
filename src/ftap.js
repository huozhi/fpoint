import {
  safeCall,
  isMouseTypeEvent,
  isTouchTypeEvent,
  isPointerSupported,
  isTouchSupported,
  isPureMouseTypeEvent
} from './helper.js'

const mouseEvents = ['mousedown', 'mouseup']
const touchEvents = ['touchstart', 'touchend']
const pointerEvents = ['pointerdown', 'pointerup']
const hoverEvents = isPointerSupported ? ['pointerenter', 'pointerleave'] : ['mouseenter', 'mouseleave']

function ulick(node, {
  onTouchDown,
  onTouchDownCapture,
  onTouchUp,
  onTouchUpCapture,
  onTouchClick,
  onTouchClickCapture,

  onMouseDown,
  onMouseDownCapture,
  onMouseUp,
  onMouseUpCapture,
  onMouseClick,
  onMouseClickCapture,

  onHoverEnter,
  onHoverEnterCapture,
  onHoverLeave,
  onHoverLeaveCapture,
}) {
  let sticking = false

  function handleDown(e) {
    sticking = true
    if (isMouseTypeEvent(e)) safeCall(onMouseDown)(e)
    if (isTouchTypeEvent(e)) safeCall(onTouchDown)(e)
  }

  function handleUp(e) {
    if (isMouseTypeEvent(e)) safeCall(onMouseUp)(e)
    if (isTouchTypeEvent(e)) safeCall(onTouchUp)(e)
    if (sticking) {
      sticking = false
      if (isMouseTypeEvent(e)) safeCall(onTouchClick)(e)
      if (isTouchTypeEvent(e)) safeCall(onMouseClick)(e)
    }
  }

  function handleHoverEnter(e) {
    if (isPureMouseTypeEvent(e)) safeCall(onHoverEnter)(e)
  }

  function handleHoverLeave(e) {
    if (isPureMouseTypeEvent(e)) safeCall(onHoverLeave)(e)
  }

  const isClickUseCapture = Boolean(
    onTouchDownCapture ||
    onTouchUpCapture ||
    onTouchClickCapture ||
    onMouseDownCapture ||
    onMouseUpCapture ||
    onMouseClickCapture
  )

  const [clickInEvent, clickOutEvent] =
    isPointerSupported ? pointerEvents : (
      isTouchSupported ? touchEvents : mouseEvents
    )

  node.addEventListener(clickInEvent, handleDown)
  node.addEventListener(clickOutEvent, handleUp)

  node.addEventListener(hoverEvents[0], handleHoverEnter)
  node.addEventListener(hoverEvents[1], handleHoverLeave)

  if (isClickUseCapture) {
    node.addEventListener(clickInEvent, handleDown, true)
    node.addEventListener(clickOutEvent, handleUp, true)
  }

  if (Boolean(onHoverEnterCapture || onHoverLeaveCapture)) {
    node.addEventListener(hoverEvents[0], handleHoverEnter, true)
    node.addEventListener(hoverEvents[1], handleHoverLeave, true)
  }

  return function release() {
    node.removeEventListener(clickInEvent, handleDown)
    node.removeEventListener(clickOutEvent, handleUp)

    node.removeEventListener(hoverEvents[0], handleHoverEnter)
    node.removeEventListener(hoverEvents[1], handleHoverLeave)

    if (isClickUseCapture) {
      node.removeEventListener(clickInEvent, handleDown, true)
      node.removeEventListener(clickOutEvent, handleUp, true)
    }

    if (Boolean(onHoverEnterCapture || onHoverLeaveCapture)) {
      node.removeEventListener(hoverEvents[0], handleHoverEnter, true)
      node.removeEventListener(hoverEvents[1], handleHoverLeave, true)
    }
  }
}

export default ulick
