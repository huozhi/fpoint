export default function Index() {
  return (
    <div className="index">
      <style jsx>{
        `code pre {
          background: #fafafa;
          padding: 16px 8px;
        }
        
        .index {
          margin: auto; max-width: 690px;
        }
        `
      }</style>
      <h1>fpoint</h1>
      <br />
      <h2>APIs & Examples</h2>
      <div>
        <ul>
          <li>
            <a href="./scrub">
              <h3>fscrub</h3>
              <small>Experience continuous dragging / scrubbing on the screen</small>
            </a>
          </li>
          <li>
            <a href="./tap">
              <h3>ftap</h3>
              <small>Distinguish among figure tap (touch) / click / mouse hover on the screen</small>
            </a>
          </li>
          <li>
            <a href="./react">
              <h3>react components</h3>
              <small>Let you use it super easily in react with common cases</small>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
