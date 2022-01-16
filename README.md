# fpoint
> simple js lib to help you lift touch experience development cross browsers

[![npm version](https://img.shields.io/npm/v/fpoint.svg?style=flat-square)](https://www.npmjs.com/package/fpoint)
[![npm downloads](https://img.shields.io/npm/dm/fpoint.svg?style=flat-square)](https://www.npmjs.com/package/fpoint)

### Install

```sh
npm i -S fpoint
```

### Usage

```js
import { fscrub, ftap } from 'fpoint'

fscrub(document.querySelector('.slider'), {
  onStart() {},
  onMove() {},
  onEnd() {},
})

ftap(document.querySelector('.button'), {
  onTouchClick() {},
  onMouseClick() {},
  onHoverEnter() {},
  onHoverLeave() {},
})
```

## fscrub

Convenient util for cross browser dragging/scrubbing experience

### Why?

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


### Usage

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

### API

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

#### Arguments

* `node` is the scrubble dom node you want to track the scrub moves.
* `handles` is an `object`. which may carry `onStart`, `onMove` and `onEnd` for different scrub phases.
* `option` is an `object`.
  `option.mouse` will enable triggering scrub events when playing with mouse, `option.touch` is for finger touch. if you specify `option.hover` to `true`, it will turn `option.mouse` to false. since the behavior have conflicts

#### Returns

A release function to let you unlisten the scrub actions of the node.

do what you need to do in the handlers `onStart`, `onMove` and `onEnd` to render changes of UI.


## ftap
Cross-browser click / single touch / hover handler

unlike **fscrub**, **ftap** is just used to detect finger touch, mouse click and mouse hover. usually we need different experience between hover and touch. since with touch devices we don't have hover options, and **ftap** help you distinguish different input sources, make each interaction type easy to be monitored


### Usage

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

## Use with React

`react-fpoint` provides a set of react components make mouse & touching easier.

```sh
npm i -S fpoint react-fpoint
```
### `<Scurb>`

`Scrub` component let you to easily attach handlers to track mouse dragging or finger scrubbing interactions. You could use it to build your custom slider, touch screen or any other advanced components you like.

#### Example

```js
import { Scrub } from 'fpoint/react'

function handleScrubMove(e) {
  const pageX = e.touches ? e.touches[0].pageX : e.pageX
  const pageY = e.touches ? e.touches[0].pageY : e.pageY
  
  // ...
}

return (
  <Scrub
    onScrubMove={handleScrubMove}
  >
    {children}
  </Scrub>
)
```

#### Component Props

```ts
component?: string | ReactComponent
onScrubStart?(e?: Event): void;
onScrubMove?(e?: Event): void;
onScrubEnd?(e?: Event): void;
onHoverStart?(e?: Event): void;
onHoverMove?(e?: Event): void;
onHoverEnd?(e?: Event): void;
```

Other props will be directly applied onto it.

### `<Tap>`

`Tap` component let you easily distinguish between touch and mouse clicks. Sometimes we're also struggling to separate mouse hover or touch enter among desktop and mobile devices. This component give you power to track every single phase during an complete interaction.

#### Example

```js
import { Tap } from 'fpoint/react'

function handleTouchClick(e) {
  const {offsetX, offsetY} = e
  // ...
}

function handleMouseClick(e) {
  // ...
}

return (
  <Tap
    onTouchClick={handleTouchClick}
    onMouseClick={handleMouseClick}
  >
    {children}
  </Tap>
)
```

#### Component Props

```ts
component?: string | ReactComponent
onTouchDown?(e?: Event): void;
onTouchUp?(e?: Event): void;
onTouchClick?(e?: Event): void;
onMouseDown?(e?: Event): void;
onMouseUp?(e?: Event): void;
onMouseClick?(e?: Event): void;
onHoverEnter?(e?: Event): void;
onHoverLeave?(e?: Event): void;
```

Other props will be directly applied onto it.
## Development

For main library

```sh
yarn
yarn build
```

For example pages

```sh
cd ./example
yarn
yarn start
```
## LICENSE

MIT
