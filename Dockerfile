FROM node:12-alpine
WORKDIR /tic-tac-toe-backend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]