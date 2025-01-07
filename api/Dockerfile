FROM node:20.16-alpine

# Create app directory
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:debug"]
