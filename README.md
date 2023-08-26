# Learning front end web development.

This repo contains all files I have written to aid in learning front end web development.

## What I have learnt so far:

### Front-End Basics

- HTML: This is like the skeleton of a webpage. Instead of bones, it is made up of a lot of boxes.
- CSS: CSS is used to tell the box what colour, font, location everything should be.
- JavaScript: JS is the programming language behind everything. It allows the webpage to be dynamic. Have some action take place in one part of the webpage, then javascript is used to convert that action into something new that possible shows up on a different part of the webpage.
- Git: Version control all the files in the project.

### JavaScript Packages

- React: React is a way of writing JS code.
  - React-dom: Extension package to react.
  - React-router-dom: Extension package to react.
- Babel: Makes writing JS code for React much simplier by allowing writing html code directly in the .js file.
- Webpack: This allows modules to be bundled up so that in theory there are less things that get downloaded when a webpage is downloaded.
  - Loaders (css-loader, style-loader, babel-loader): loaders are used to translate files for webpack to pack.

### Backend

- Node.js: This is the runtime environment that allows JavaScript to be run to allow back end web applications to be built on it.
- Express: This is a package that sits on top of Node.js.

### Database

- PostgreSQL: I'm using a relational database that uses SQL to get a grasp on things before trying a more advanced stack.

<!--
DROP TABLE pokemon;

CREATE TABLE pokemon (
PokedexNumber INT,
Name VARCHAR(255),
Form VARCHAR(255),
Type1 VARCHAR(255),
Type2 VARCHAR(255),
Ability1 VARCHAR(255),
Ability2 VARCHAR(255),
HiddenAbility VARCHAR(255),
HP INT,
Attack INT,
Defense INT,
SpAttack INT,
SpDefense INT,
Speed INT,
Height VARCHAR(255),
Weight VARCHAR(255),
PokemonImageFilename VARCHAR(255)
);

\COPY pokemon FROM 'C:/Users/kwong/Downloads/PokemonStats.csv' WITH (FORMAT csv, HEADER true);
-->
