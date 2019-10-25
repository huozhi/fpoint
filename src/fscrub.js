import {
  isPointerSupported,
  isMouseTypeEvent,
  isTouchTypeEvent,
  safeCall,
} from './helper'

const pointerScrubEvents = ['pointerdown', 'pointermove', 'pointerup']
const touchScrubEvents = ['touchstart', 'touchmove', 'touchend']
const pointerOverEvents = ['pointerenter', 'pointermove', 'pointerleave']
const mouseOverEvents = ['mouseenter', 'mousemove', 'mouseleave']
const cancelEvent = isPointerSupported ? 'pointercancel' : 'touchcancel'

function getScrubEvents() {
  return isPointerSupported ? pointerScrubEvents : touchScrubEvents
}

function getHoverEvents() {
  return isPointerSupported ? pointerOverEvents : mouseOverEvents
}

function fscrub(
  node,
  {onStart, onMove, onEnd},
  options
) {
  onStart = safeCall(onStart)
  onMove = safeCall(onMove)
  onEnd = safeCall(onEnd)
  options = Object.assign({hover: false, mouse: false, touch: true}, options)
  if (options.hover) {
    options.mouse = false;
  }
  const {hover, mouse, touch} = options
  const isHoverEnabled = Boolean(hover)
  const isMouseEnabled = Boolean(mouse)
  const isTouchEnabled = Boolean(touch)
  const events = hover ? getHoverEvents() : getScrubEvents()
  const endElement = hover ? node : document

  const [startEvent, moveEvent, endEvent] = events
  let isMoving = false

  function handleStart(e) {
    isMoving = true
    if (isMouseEnabled && isMouseTypeEvent(e)) onStart(e)
    if (isTouchEnabled && isTouchTypeEvent(e)) onStart(e)
    if (isHoverEnabled && isMouseTypeEvent(e)) onStart(e)
  }

  function handleMove(e) {
    if (isMoving) {
      if (isMouseEnabled && isMouseTypeEvent(e)) onMove(e)
      if (isTouchEnabled && isTouchTypeEvent(e)) onMove(e)
      if (isHoverEnabled && isMouseTypeEvent(e)) onMove(e)
    }
  }

  function handleEnd(e) {
    isMoving = false
    if (isMouseEnabled && isMouseTypeEvent(e)) onEnd(e)
    if (isTouchEnabled && isTouchTypeEvent(e)) onEnd(e)
    if (isHoverEnabled && isMouseTypeEvent(e)) onEnd(e)
  }

  node.addEventListener(startEvent, handleStart)
  node.addEventListener(moveEvent, handleMove)
  endElement.addEventListener(endEvent, handleEnd)

  !hover && node.addEventListener(cancelEvent, handleEnd)

  if (!isPointerSupported && isMouseEnabled) {
    node.addEventListener('mousedown', handleStart)
    node.addEventListener('mousemove', handleMove)
    endElement.addEventListener('mouseup', handleEnd)
  }

  return function release() {
    node.removeEventListener(startEvent, handleStart)
    node.removeEventListener(moveEvent, handleStart)
    endElement.removeEventListener(endEvent, handleStart)

    if (!isPointerSupported && isMouseEnabled) {
      node.removeEventListener('mousedown', handleStart)
      node.removeEventListener('mousemove', handleMove)
      endElement.removeEventListener('mouseup', handleEnd)
    }

    !hover && node.removeEventListener(cancelEvent, handleEnd)
  }
}

export default fscrub
