import React from "react";
import { Link } from "react-router-dom";

export default function MainDark() {
  const [clickFirst, setClickFirst] = React.useState(0);
  const [clickSecond, setClickSecond] = React.useState(0);
  const [clickThird, setClickThird] = React.useState(0);

  React.useEffect(() => {
    console.log(`Times button clicked: ${clickFirst}, ${clickSecond}, ${clickThird}`);
    const backgroundColour = `rgb(${5 * clickFirst}, ${5 * clickSecond}, ${5 * clickThird})`;
    document.body.style.backgroundColor = backgroundColour;
  }, [clickFirst, clickSecond, clickThird]);

  document.title = "React Dark Page";
  document.body.style.color = "White";

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
