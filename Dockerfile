FROM node:latest

WORKDIR /

COPY . .

CMD ["npm", "run", "start:prod"]

