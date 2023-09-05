import React from "react";

import { Heading1 } from "../common/heading.jsx";

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
    name: "React Lite",
    link: "lite",
  },
  {
    name: "React Dark",
    link: "dark",
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

export default function MainNavigate() {
  document.title = "Index Page";
  document.body.style.color = "Black";
  document.body.style.backgroundColor = "White";

  return (
    <main>
      <Heading1 heading="Links to Other Pages" />
      <ul>
        <LinkToPages links={miniProjects} />
      </ul>
    </main>
  );
}
