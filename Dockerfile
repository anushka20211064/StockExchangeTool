FROM node

# Create working directory app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# This will copy everything from the source path 
COPY . .

# update each dependency in package.json to the latest version
RUN npm install express mysql cors --save

EXPOSE 8088
CMD [ "node", "server.js" ]