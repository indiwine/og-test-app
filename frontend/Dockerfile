FROM node:20.16-alpine

# Create app directory
WORKDIR /app

COPY . .


RUN npm install

EXPOSE 5173
# We only running dev environment here, so dont need tobuid the app or serve it
CMD ["npm", "run", "dev"]
