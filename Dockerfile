FROM node:18-alpine
WORKDIR /usr/src/app
# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci
# Copy the application source code
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
