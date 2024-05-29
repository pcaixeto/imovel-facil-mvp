FROM node:18

WORKDIR /app

COPY . .

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

CMD npx serve -s . -l 3000
