# Step 1: Build the React app
FROM node:18-alpine AS build

# Install required dependencies to avoid failures
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy dependency files first to leverage Docker caching
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the application code
COPY . ./
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy built assets from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
