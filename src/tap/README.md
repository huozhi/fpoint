# ftap
> cross-browser click / single touch / hover handler

## Usage

```js
ftap(domNode, {
  // for single touch
  onTouchDown(event) { /*...*/ },
  onTouchUp(event) { /*...*/ },
  onTouchClick(event) { /*...*/ },

  // for mouse click
  onMouseDown(event) { /*...*/ },
  onMouseUp(event) { /*...*/ },
  onMouseClick(event) { /*...*/ },

  // for mouse hover
  onHoverEnter(event) { /*...*/ },
  onHoverLeave(event) { /*...*/ },
})
```

the kind of `event` may be one of the input events (`PointerEvent`, `TouchEvent`, `MouseEvent`), depends on what really fired by browser.
