const isTouchSupported = Boolean(window.TouchEvent)
const isPointerSupported = Boolean(window.PointerEvent)

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (e instanceof window.MouseEvent)
const isTouchTypeEvent = e => e.pointerType === 'touch' || (e instanceof window.TouchEvent)

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
}
