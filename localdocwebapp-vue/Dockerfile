# Use the node image from official Docker Hub
FROM node:20-alpine3.19 as build-stage
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# List the contents of the /app directory for debugging
RUN ls -l /app
# Install the project dependencies
RUN npm install
# Copy the rest of the project files to the container
COPY . .
# Build the Vue.js application to the production mode to dist folder
RUN npm run build

# Expose the port 80
EXPOSE 80
# Start the application
CMD ["npm", "run", "dev", "--", "--host"]
