# Stage 1: Build
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Create a non-root user and group
ARG USER=nodeapp
ARG GROUP=nodeapp
RUN addgroup -S $GROUP && adduser -S $USER -G $GROUP

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=build /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Change ownership of the application files
RUN chown -R $USER:$GROUP /usr/src/app

# Switch to the non-root user
USER $USER

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node", "dist/index.js"]