const isMouseSupported = Boolean(window.MouseEvent)
const isTouchSupported = Boolean(window.TouchEvent)
const isPointerSupported = Boolean(window.PointerEvent)

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (isMouseSupported && e instanceof window.MouseEvent)
const isTouchTypeEvent = e => e.pointerType === 'touch' || (isTouchSupported && e instanceof window.TouchEvent)

/*
 * isPureMouseTypeEvent
 * case 1: pointer event, mouse
 * case 2: pure mouse event, pointer event not supported (e.g. safari)
 * case 3: pure mouse event, pointer supported but it's not pointer event instance
 */
const isPureMouseTypeEvent = e => e.pointerType === 'mouse' ||
  (isMouseSupported && e instanceof window.MouseEvent &&
    (!isPointerSupported || !(e instanceof window.PointerEvent)))

function safeCall(fn) {
  return (...args) => {
    (typeof fn === 'function') && fn(...args)
  }
}

export {
  safeCall,
  isTouchSupported,
  isPointerSupported,
  isMouseTypeEvent,
  isTouchTypeEvent,
  isPureMouseTypeEvent,
}
