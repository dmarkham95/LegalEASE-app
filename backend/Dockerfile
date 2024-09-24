# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the compiled code
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist /app/dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
