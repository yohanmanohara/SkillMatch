# Stage 1: Build the application
FROM node:20-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
    
#expose the port
EXPOSE 3000

#start the projrct
CMD ["npm","run","dev"]


