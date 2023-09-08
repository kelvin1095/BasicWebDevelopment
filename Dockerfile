# Use an official Node.js runtime as the base image
FROM node:alpine AS development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Specify the command to run the application
CMD ["node", "server/server.js"]


FROM node:alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
CMD ["node", "server/server.js"]
