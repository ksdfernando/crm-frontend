# Stage 1: Build the frontend
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy build output to Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Or use /app/build for React
# COPY --from=build /app/build /usr/share/nginx/html

# Optional: Replace default Nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
