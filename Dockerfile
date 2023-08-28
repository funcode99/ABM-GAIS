FROM node:fermium-slim

WORKDIR /app

COPY . .

RUN npm install -g create-vite

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev", "--host"]
