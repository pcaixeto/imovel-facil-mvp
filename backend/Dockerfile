FROM node:18

WORKDIR /app

COPY . .

EXPOSE 3000
EXPOSE 3001

HEALTHCHECK CMD curl --fail http://localhost:3001/anuncio || exit 1

CMD npm run start

