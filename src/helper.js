const isMouseSupported = Boolean(window.MouseEvent)
const isTouchSupported = Boolean(window.TouchEvent)
const isPointerSupported = Boolean(window.PointerEvent)

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (isMouseSupported && e instanceof window.MouseEvent)
const isPureMouseTypeEvent = e => e.pointerType === 'mouse' ||
  (isMouseSupported && e instanceof window.MouseEvent && isPointerSupported && !(e instanceof window.PointerEvent))
const isTouchTypeEvent = e => e.pointerType === 'touch' || (isTouchSupported && e instanceof window.TouchEvent)

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
