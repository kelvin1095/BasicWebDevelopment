# Use an official Node.js runtime as the base image
FROM node:15 AS development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Specify the command to run the application
CMD ["npm", "run", "start"]


# Use an official Node.js runtime as the base image
FROM node:15 AS production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# Specify the command to run the application
CMD ["npm", "run", "start"]
