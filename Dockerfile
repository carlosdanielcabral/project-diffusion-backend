FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]
EXPOSE 3001