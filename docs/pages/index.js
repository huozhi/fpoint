export default function Index() {
  return (
    <div className="index">
      <h1>fpoint</h1>
      <br />
      <h3>examples</h3>
      <div>
        <ul>
          <li>
            <a href="./scrub">
              <h4>fscrub</h4>
              <small> experience continuous dragging / scrubbing on the screen</small>
            </a>
          </li>
          <li>
            <a href="./tap">
              <h4>ftap</h4>
              <small> distinguish among figure tap (touch) / click / mouse hover on the screen</small>
            </a>
          </li>
        </ul>
      </div>
      <h3>usage</h3>
      <code>
        <pre>
          {`
import {fscrub, ftap} from 'fpoint'

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
`}
        </pre>
      </code>
    </div>
  )
}
