FROM node

WORKDIR /app

COPY . .

EXPOSE 3000

CMD npm install ; node index.js