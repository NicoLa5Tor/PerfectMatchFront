FROM node:16-bullseye

WORKDIR /app


 COPY . .

RUN npm install

EXPOSE 4200

CMD [ "npm","start" ]
