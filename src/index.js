import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header>
      <h1>Hello, Welcome to my index page!</h1>
    </header>
  );
}

const miniProjects = [
  {
    name: "Old Index Page",
    link: "pages/oldIndex.html",
  },
  {
    name: "Time App",
    link: "pages/clock.html",
  },
  {
    name: "To-do List",
    link: "pages/todo.html",
  },
  {
    name: "BlackJack",
    link: "pages/blackjack.html",
  },
  {
    name: "Pokemon",
    link: "pages/pokemon.html",
  },
  {
    name: "Resume",
    link: "pages/resume.html",
  },
  {
    name: "Boxes",
    link: "pages/events.html",
  },
  {
    name: "Creepy Page",
    link: "pages/creepy.html",
  },
  {
    name: "React",
    link: "lite",
  },
];

function LinkToPages(props) {
  return props.links.map((pageItem, index) => (
    <React.Fragment key={index}>
      <li>
        <a href={pageItem.link}>{pageItem.name}</a>
      </li>
    </React.Fragment>
  ));
}

function MainNavigate() {
  return (
    <main>
      <h1>Links to Other Pages</h1>
      <ul>
        <LinkToPages links={miniProjects} />
      </ul>
    </main>
  );
}

function MainLite() {
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
      <nav>
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

function MainDark() {
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
      <nav>
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
        <Route path="/" element={<MainNavigate />} />
        <Route path="/lite" element={<MainLite />} />
        <Route path="/dark" element={<MainDark />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
