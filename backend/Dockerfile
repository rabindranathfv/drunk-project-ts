# Create image based on the official Node 6 image from the dockerhub
FROM node:16-alpine

RUN npm install -g ts-node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./
# Get all the code needed to run the app
COPY . .

# Install dependecies
RUN npm install

ENV NODE_ENV=production

run npm run build-tsc

RUN cd ./build

RUN ls -alt ./build/

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run" ,"start-prod"]
