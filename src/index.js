import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header>
      <h1>Hello World!</h1>
      <nav>
        <Link to="/dark">Dark</Link>
        <Link to="/lite">Light</Link>
      </nav>
    </header>
  );
}

function Main() {
  const [clickFirst, setClickFirst] = React.useState(0);
  const [clickSecond, setClickSecond] = React.useState(0);
  const [clickThird, setClickThird] = React.useState(0);

  React.useEffect(() => {
    console.log(`Times button clicked: ${clickFirst}, ${clickSecond}, ${clickThird}`);
    const backgroundColour = `rgb(${255 - 5 * clickFirst}, ${255 - 5 * clickSecond}, ${255 - 5 * clickThird})`;
    document.body.style.backgroundColor = backgroundColour;
  }, [clickFirst, clickSecond, clickThird]);

  return (
    <main>
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

function Main2() {
  const [clickFirst, setClickFirst] = React.useState(0);
  const [clickSecond, setClickSecond] = React.useState(0);
  const [clickThird, setClickThird] = React.useState(0);

  React.useEffect(() => {
    console.log(`Times button clicked: ${clickFirst}, ${clickSecond}, ${clickThird}`);
    const backgroundColour = `rgb(${5 * clickFirst}, ${5 * clickSecond}, ${5 * clickThird})`;
    document.body.style.backgroundColor = backgroundColour;
  }, [clickFirst, clickSecond, clickThird]);

  return (
    <main>
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

function Heading1({ heading }) {
  return <h1>{heading}</h1>;
}

const contact = [
  {
    site: "GitHub",
    link: "https://github.com/kelvin1095",
  },
  {
    site: "LinkedIn",
    link: "https://www.linkedin.com/in/kelvin-w-14679ab4",
  },
  {
    site: "Instagram",
    link: "https://www.instagram.com/negativeprogress",
  },
  {
    site: "Threads",
    link: "https://www.threads.net/@negativeprogress",
  },
];

function ContactLinks(props) {
  const separator = " | ";

  return props.links.map((contactItem, index) => (
    <React.Fragment key={contactItem.site}>
      {index > 0 && separator}
      <a href={contactItem.link}>{contactItem.site}</a>
    </React.Fragment>
  ));
}

function Footer() {
  return (
    <footer>
      <Heading1 heading="Keep in Touch" />
      <div id="contactInfo">
        <ContactLinks links={contact} />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/lite" element={<Main />} />
        <Route path="/dark" element={<Main2 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
