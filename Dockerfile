# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install all dependencies (including devDependencies for build)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-slim AS production

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 5137 

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5137

# Start the application
CMD ["bun", "run", "start"]
