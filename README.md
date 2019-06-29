# fscrub

## Why?

Different browsers have different support on touch experience, egde, chrome, safari have their own implementation of touch support and the events stack may not be expected on touchable devices. Especially sometimes we only want to do a simple scrub. Why can't the scrub action be easy as the click with mouse on desktop?

Let's see the observation on behavior of desktop devices + mouse and touchable devices + touch:

|Browser & Action| PointerEvent | MouseEvent | TouchEvent |
|:---:|:---:|:---:|:---:|
| chrome + touch | ✅ | ✅ | ✅ |
| edge + touch | ✅ | ✅ | ❌ |
| safari + touch | ❌ | ❌ | ✅ |
| chrome + mouse | ✅ | ✅ | ❌ |
| edge + mouse | ✅ | ✅ | ❌ |
| safari + mouse | ❌ | ✅ | ❌ |

Emmmmm......

Since chrome and edge both support `PointerEvent`, safari and chrome both support `TouchEvent`, edge on touch devices will fire mouse event but other dont', we cannot use any single event as we want. If we don't have `PointerEvent` polyfill on safari, it will ba hard to listen to scrub actions.

fscrub is used to resolve the diffculties and let you write less code.


## Usage

```html
<div class="scrub__baseline">
  <div class="scrub__head" />
</div>
```

```js
fscrub(
  document.querySelector('.scrub__head'),
  {
    onStart() { ... },
    onMove() { ... },
    onEnd() { ... },
  },
  {
    mouse: false,
    touch: true,
    hover: true,
  }
)
```

## `fsrcub`

```js
fscrub(
  node: Node,
  {
    onStart: function(MouseEvent | PointerEvent | TouchEvent) {},
    onMove: function(MouseEvent | PointerEvent | TouchEvent) {},
    onEnd: function(MouseEvent | PointerEvent | TouchEvent) {},
  },
  { mouse: boolean, touch: boolean, hover: boolean }
)
```

### Arguments

* `node` is the scrubble dom node you want to track the scrub moves.
* `handles` is an `object`. which may carry `onStart`, `onMove` and `onEnd` for different scrub phases.
* `option` is an `object`.
  `option.mouse` will enable triggering scrub events when playing with mouse, `option.touch` is for finger touch. if you specify `option.hover` to `true`, it will turn `option.mouse` to false. since the behavior have conflicts

### Returns

A release function to let you unlisten the scrub actions of the node.

do what you need to do in the handlers `onStart`, `onMove` and `onEnd` to render changes of UI.


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
