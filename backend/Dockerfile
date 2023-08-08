# Use the official Node.js image as the base image
FROM node:18-alpine3.16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

RUN npx prisma generate

# Start the application with nodemon for hot-reloading during development
CMD ["npm", "run", "dev"]
