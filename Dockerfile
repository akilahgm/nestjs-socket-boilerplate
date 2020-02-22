FROM node:10-alpine

WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for productionS
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build
RUN pwd
RUN ls

EXPOSE 80

CMD ["npm", "run","start:prod"]