const isPointerSupported = Boolean(window.PointerEvent)
const isTouchSupported = Boolean(window.TouchEvent)
const mouseEvents = ['mousedown', 'mouseup']
const touchEvents = ['touchstart', 'touchend']
const pointerEvents = ['pointerdown', 'pointerup']

const hoverEvents = isPointerSupported ? ['pointerenter', 'pointerleave'] : ['mouseenter', 'mouseleave']

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (e instanceof window.MouseEvent)
const isTouchTypeEvent = e => e.pointerType === 'touch' || (e instanceof window.TouchEvent)

function safeCall(fn) {
  return (...args) => {
    (typeof fn === 'function') && fn(...args)
  }
}

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
    if (isMouseTypeEvent(e)) safeCall(onHoverEnter)(e)
  }

  function handleHoverLeave(e) {
    if (isMouseTypeEvent(e)) safeCall(onHoverLeave)(e)
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
