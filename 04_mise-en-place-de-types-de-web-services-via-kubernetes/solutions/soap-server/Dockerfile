# Use nodejs
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port listened by the server
EXPOSE 8000

# Start app
CMD [ "npm", "start" ]