# Learning front end web development.

This repo contains all files I have written to aid in learning web development from font to back.

## What I have learnt so far:

### Front-End Basics

- HTML: This is like the skeleton of a webpage. Instead of bones, it is made up of a lot of boxes.
- CSS: CSS is used to tell the box what colour, font, location everything should be.
- JavaScript: JS is the programming language behind everything. It allows the webpage to be dynamic. Have some action take place in one part of the webpage, then javascript is used to convert that action into something new that possible shows up on a different part of the webpage.
- Git: Version control all the files in the project.

### JavaScript Packages

- React: React is a way of writing JS code to build the html. The main draw of react are states and functions that react to the changes in states. React has a large ecosystem and is the most popular framework.
  - React-dom: Extension package to react.
  - React-router-dom: Extension package to react.
- Babel: Makes writing JS code for React much simplier by allowing writing html code directly in the .js file.
- Webpack: This allows modules to be bundled up so that in theory there are less things that get downloaded when a webpage is downloaded.
  - Loaders (css-loader, style-loader, babel-loader): loaders are used to translate files for webpack to pack.

### Backend

- Node.js: This is the runtime environment that allows JavaScript to be run to allow back end web applications to be built on it.
- Express: This is a package that sits on top of Node.js and helps simplify the backend development process. It does this through routing, middleware handling and simplifying server-side code.
- pg: This package helps with connecting with PostgreSQL. It allows SQL queries to be executed.

### Database

- PostgreSQL: I'm using a relational database that uses SQL to get a grasp on things before trying a more advanced stack.

### Docker

- Dockerfile is used to create a docker image.
- A running image is called a container.
- Stop a container before deleting the image.
- There are additional commands that add more functionality.
  - EXPOSE: Used to expose ports.
  - VOLUME: Create a persistant storage that remains after the container shuts down.
- You can also put the same steps twice for different image streams to create different images for development and production (FROM node:15 AS production, --only=production, image-name:production --target production).
  - Developer containers are using bind mounts. These link files between code locally and code inside the container so that changes made will reflect immediately.
  - To use a bind mount, docker run -p 8080:3000 -v /home/kwong/webdev/BasicWebDevelopment:/usr/src/app your-image-name:development

### Things I still want to do:

- Using Nginx as a load balancer
- Server-side rendering in React with Next.js
- Another JS framework, possibly svelte and svelte-kit
- Searching for a free location to be able to test.

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
  Att INT,
  Def INT,
  SpA INT,
  SpD INT,
  Spe INT,
  Height VARCHAR(255),
  Weight VARCHAR(255),
  PokemonImageFilename VARCHAR(255)
  );

\COPY pokemon FROM 'C:/Users/kwong/Desktop/websiteDev/BasicWebDevelopment/public/pokemonAssets/PokemonStats.csv' WITH (FORMAT csv, HEADER true);

psql -h host.docker.internal -p 5432 -U postgres -d postgres

\COPY pokemon FROM '/home/kwong/webdev/BasicWebDevelopment/public/pokemonAssets/PokemonStats.csv' WITH (FORMAT csv, HEADER true);

\l - List out all database
\du - List out all users
-->

<!-- DOCKER
docker build -t docker-test-image:development --target development .
docker build -t docker-test-image:production --target production .
docker run -p 8080:3000 -v /home/kwong/webdev/BasicWebDevelopment:/usr/src/app docker-test-image:development
docker-compose up
 -->
