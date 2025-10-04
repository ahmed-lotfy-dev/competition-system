# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL=postgres://admin:admin@postgres:5432/competition

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/db ./src/db

EXPOSE 5000

CMD ["node", "dist/index.js"]
