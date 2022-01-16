const win = typeof window !== 'undefined' ? window : {}
const isMouseSupported = Boolean(win.MouseEvent)
const isTouchSupported = Boolean(win.TouchEvent)
const isPointerSupported = Boolean(win.PointerEvent)

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (isMouseSupported && e instanceof win.MouseEvent)
const isTouchTypeEvent = e => e.pointerType === 'touch' || (isTouchSupported && e instanceof win.TouchEvent)

/*
 * isPureMouseTypeEvent
 * case 1: pointer event, mouse
 * case 2: pure mouse event, pointer event not supported (e.g. safari)
 * case 3: pure mouse event, pointer supported but it's not pointer event instance
 */
const isPureMouseTypeEvent = e => e.pointerType === 'mouse' ||
  (isMouseSupported && e instanceof win.MouseEvent &&
    (!isPointerSupported || !(e instanceof win.PointerEvent)))

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
