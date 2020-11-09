export function fscrub(
  node: HTMLElement,
  handlers: {
    onStart?(e: Event): void,
    onMove?(e: Event): void,
    onEnd?(e: Event): void,
  },
  options?: {
    hover?: boolean, 
    mouse?: boolean,
    touch?: boolean,
  }
): () => void

export function ftap(
  node: HTMLElement, 
  handlers: {
    onTouchDown?(e: Event): void,
    onTouchDownCapture?(e: Event): void,
    onTouchUp?(e: Event): void,
    onTouchUpCapture?(e: Event): void,
    onTouchClick?(e: Event): void,
    onTouchClickCapture?(e: Event): void,
    onMouseDown?(e: Event): void,
    onMouseDownCapture?(e: Event): void,
    onMouseUp?(e: Event): void,
    onMouseUpCapture?(e: Event): void,
    onMouseClick?(e: Event): void,
    onMouseClickCapture?(e: Event): void,
    onHoverEnter?(e: Event): void,
    onHoverEnterCapture?(e: Event): void,
    onHoverLeave?(e: Event): void,
    onHoverLeaveCapture?(e: Event): void,
  }
): () => void

