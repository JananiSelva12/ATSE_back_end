FROM docker.io/library/node:18.16.0-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

FROM node:18.16.0-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/app/node_modules node_modules 
COPY package*.json ./ 
COPY config config 
# COPY views views 
COPY tsconfig.json ./tsconfig.json

EXPOSE 3000 
ENV NODE_ENV=production 
CMD [ "node", "dist/index.js" ]
