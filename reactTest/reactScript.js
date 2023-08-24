const React = window.React;
const ReactDOM = window.ReactDOM;

// How to use react without babel (old)
// ReactDOM.render(React.createElement("h1", null, "Hello World!"), document.getElementById("about"));

// How to use react with babel (old)
// ReactDOM.render(<h1>Hello World!</h1>, document.getElementById("about"));

// How to use react without babel (new)
// const about = React.createElement("h1", null, "Hello World!");
// const root = ReactDOM.createRoot(document.getElementById("about"));
// root.render(about);

// How to use react with babel (new)
// const about = <h1>Hello World!</h1>;
// const aboutRoot = ReactDOM.createRoot(document.getElementById("about"));
// aboutRoot.render(about);

// Using props
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
  return props.links.map((contactItem) => (
    <a key={contactItem.site} href={contactItem.link}>
      {contactItem.site}
    </a>
  ));
}

function Heading1({ heading }) {
  return <h1>{heading}</h1>;
}

function Footer() {
  return (
    <div>
      <Heading1 heading="Keep in Touch" />
      <div id="contactInfo">
        <ContactLinks links={contact} />
      </div>
    </div>
  );
}
const footerRoot = ReactDOM.createRoot(document.getElementById("links"));

footerRoot.render(<Footer />);

function Image(props) {
  return <img height={props.height} src={props.source} alt={props.alt} />;
}

function Main() {
  return (
    <div>
      <Heading1 heading="Great Places to Visit!" />
      <Image height={600} source="../images/vicky-ng-M8qnX9fvpNs-unsplash.jpg" alt="Jiufen" />
    </div>
  );
}

const aboutRoot = ReactDOM.createRoot(document.getElementById("about"));
aboutRoot.render(<Main />);

function Header() {
  const [click, setClick] = React.useState(0);
  const [clickSecond, setClickSecond] = React.useReducer((clickSecond) => clickSecond + 1, 0);

  React.useEffect(() => {
    console.log(`Times button clicked: ${click}, ${clickSecond}`);
  }, [click, clickSecond]);

  return (
    <div>
      <h1>Click Test</h1>
      <p>Current Click Count: {click}</p>
      <button onClick={() => setClick(click + 1)}>Click Here!</button>

      <h1>Click Test 2</h1>
      <p>Current Click Count: {clickSecond}</p>
      <button onClick={setClickSecond}>Click Here!</button>
    </div>
  );
}

const headerRoot = ReactDOM.createRoot(document.getElementById("clickTest"));
headerRoot.render(<Header />);
