# Stage 1: Build the React Native app
FROM node:14-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to container
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run the app with OpenJDK
FROM openjdk:11

# Set working directory
WORKDIR /app

# Copy the app files from the previous stage to this container
COPY --from=build /app .

# Start the app (??)
CMD ["npm", "start"]
