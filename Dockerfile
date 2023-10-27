FROM node:18-alpine
WORKDIR /diffusion/api
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]
EXPOSE 3001
