import React from "react";
import ReactDOM from "react";

// How to use react without babel (new)
const about = React.createElement("h1", null, "Hello World!");
const root = ReactDOM.createRoot(document.getElementById("about"));
root.render(about);

// console.log("hello world");
