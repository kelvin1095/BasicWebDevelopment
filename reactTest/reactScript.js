const React = window.React;
const ReactDOM = window.ReactDOM;

// ReactDOM.render(React.createElement("h1", null, "Hello World!"), document.getElementById("about"));
// ReactDOM.render(<h1> Hello World!</h1>, document.getElementById("about"

// ReactDOM.render(<h1>Hello World!</h1>, document.getElementById("about"));

const hello = React.createElement("h1", null, "Hello World!");
const root = ReactDOM.createRoot(document.getElementById("about"));
root.render(hello);
