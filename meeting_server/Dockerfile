# server/Dockerfile
# Use Node 20 (alpine version for a smaller image)
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Express runs on
EXPOSE 3003

# Start the Express server
CMD ["npm", "run","dev"]
