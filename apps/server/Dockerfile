FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Build stage
FROM base AS builder

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/server ./apps/server

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build shared package
RUN pnpm --filter @indo-finity/shared build

# Build server
RUN pnpm --filter server build

# Production stage
FROM base AS runner

WORKDIR /app

# Copy built files
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/server

EXPOSE 3001

CMD ["node", "dist/index.js"]
