import {fscrub} from 'https://cdn.jsdelivr.net/gh/huozhi/fpoint@master/src/fscrub.js'

const logs = []
const logNode = document.getElementById('logs')
const statusNode = document.getElementById('status')
const rootNode = document.getElementById('app')
const mouseToggler = document.querySelector('#mouse-toggler')
const touchToggler = document.querySelector('#touch-toggler')
const hoverToggler = document.querySelector('#hover-toggler')
const timeline = document.querySelector('.scrub')
const block = document.querySelector('.scrub__head')
const indicator = document.querySelector('.scrub__indicator')

const mouseEvents = [
  'mouseenter',
  'mouseleave',
  'mouseup',
  'mousedown',
  'mousemove'
]

const touchEvents = ['touchstart', 'touchmove', 'touchend']

const pointerEvents = mouseEvents.map(e => e.replace('mouse', 'pointer'))

function logging(text) {
  const maxCount = 12
  logs.push(text)
  if (logs.length > maxCount) logs.shift()
}

function renderLog() {
  const html = logs.map(t => `<div>${t}</div>`).join('')
  return html
}

function app() {
  const allEvents = mouseEvents.concat(touchEvents).concat(pointerEvents)
  allEvents.forEach(event => {
    rootNode.addEventListener(event, () => {
      // add promise 'cause directly re-render will block checkbox triggering
      Promise.resolve().then(() => {
        const args = [event, event.pointerType].filter(Boolean)
        logging(args.join(' '))
        logNode.innerHTML = renderLog()
      })
    })
  })

  function start(e) {
    statusNode.innerText = 'Scrub Start'
  }

  function move(e) {
    statusNode.innerText = 'Scrub Move'
    setPos(e)
  }

  function end(e) {
    statusNode.innerText = 'Scrub End'
  }

  function setPos(e) {
    const parentBcr = timeline.getBoundingClientRect()

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const distance = pageX - parentBcr.left

    const offsetX = Math.min(Math.max(0, distance), parentBcr.width)

    indicator.style.width = `${pageX}px`
    block.style.transform = `translateX(${offsetX}px)`
  }

  function observeScrubConfiguration({
    isMouseSupportEnabled,
    isTouchSupportEnabled,
    isHoverSupportEnabled
  }) {
    return fscrub(
      timeline,
      {
        onStart: start,
        onMove: move,
        onEnd: end
      },
      {
        mouse: isMouseSupportEnabled,
        touch: isTouchSupportEnabled,
        hover: isHoverSupportEnabled,
      }
    )
  }

  let releaseScrub = () => {}
  ;[mouseToggler, touchToggler, hoverToggler].forEach(toggler => {
    toggler.addEventListener('change', () => {
      if (!mouseToggler.checked) mouseToggler.removeAttribute('checked')
      if (!touchToggler.checked) touchToggler.removeAttribute('checked')
      releaseScrub();
      releaseScrub = observeScrubConfiguration({
        isMouseSupportEnabled: mouseToggler.checked,
        isTouchSupportEnabled: touchToggler.checked,
        isHoverSupportEnabled: hoverToggler.checked,
      })
    })
  })

  releaseScrub = observeScrubConfiguration({
    isMouseSupportEnabled: mouseToggler.checked,
    isTouchSupportEnabled: touchToggler.checked,
    isHoverSupportEnabled: hoverToggler.checked,
  })
}

app()
