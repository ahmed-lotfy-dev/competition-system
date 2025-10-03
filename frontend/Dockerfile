# --- Builder stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# --- Production stage ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy build output + public files
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
