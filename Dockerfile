# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
