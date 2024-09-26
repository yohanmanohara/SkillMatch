# Use a base image with Node.js
FROM node:latest

# Set working directory
WORKDIR /

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port where your Node.js app will run
EXPOSE 4000

# Command to run the application
CMD ["node", "start"]
