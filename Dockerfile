# Step 1: Build the React app
FROM node:18-alpine AS build

# Add build tools (required for many packages)
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build
