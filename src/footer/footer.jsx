import React from "react";

import { Heading1 } from "../common/heading.jsx";

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

export default function Footer() {
  return (
    <footer>
      <Heading1 heading="Keep in Touch" />
      <div id="contactInfo">
        <ContactLinks links={contact} />
      </div>
    </footer>
  );
}
