# Use the node image from official Docker Hub
FROM node:20-alpine3.19 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from localdocwebapp-vue
COPY localdocwebapp-vue/package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files from localdocwebapp-vue
COPY localdocwebapp-vue/ .

# Build the Vue.js application to the production mode to dist folder
RUN npm run build

# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine as production-stage

# Copy the built application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY localdocwebapp-vue/assets/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
