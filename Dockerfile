FROM node
WORKDIR /app
COPY package*.json ./ 
RUN npm i corepack -g
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
 