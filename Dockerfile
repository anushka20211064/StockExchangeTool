FROM node
# update dependencies and install curl
# RUN apt-get update && apt-get install -y \
#    curl \
#    && rm -rf /var/lib/apt/lists/*

# Create working directory app
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# This will copy everything from the source path 
COPY . .

# update each dependency in package.json to the latest version
RUN npm install express mysql cors --save

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . /app
EXPOSE 8089
CMD [ "node", "server.js" ]