import React from "react";
import { Link } from "react-router-dom";

export default function MainLite() {
  const [clickFirst, setClickFirst] = React.useState(0);
  const [clickSecond, setClickSecond] = React.useState(0);
  const [clickThird, setClickThird] = React.useState(0);

  React.useEffect(() => {
    console.log(`Times button clicked: ${clickFirst}, ${clickSecond}, ${clickThird}`);
    const backgroundColour = `rgb(${255 - 5 * clickFirst}, ${255 - 5 * clickSecond}, ${255 - 5 * clickThird})`;
    document.body.style.backgroundColor = backgroundColour;
  }, [clickFirst, clickSecond, clickThird]);

  document.title = "React Lite Page";
  document.body.style.color = "Black";

  return (
    <main>
      <nav>
        <Link to="/">Main</Link>
        <Link to="/dark">Dark</Link>
        <Link to="/lite">Light</Link>
      </nav>

      <h2>Click Test Red</h2>
      <p>Current Click Count: {clickFirst}</p>
      <button onClick={() => setClickFirst(clickFirst + 1)}>Click Here!</button>

      <h2>Click Test Green</h2>
      <p>Current Click Count: {clickSecond}</p>
      <button onClick={() => setClickSecond(clickSecond + 1)}>Click Here!</button>

      <h2>Click Test Blue</h2>
      <p>Current Click Count: {clickThird}</p>
      <button onClick={() => setClickThird(clickThird + 1)}>Click Here!</button>
    </main>
  );
}
