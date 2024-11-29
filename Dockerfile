# Build stage
FROM node:20-alpine AS builder

# Create non-root user
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup appuser

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Set ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code with correct ownership
COPY --chown=appuser:appgroup . .

# Build application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

# Create same non-root user as builder
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup appuser

# Set working directory
WORKDIR /app

# Install serve globally and set permissions
RUN npm install -g serve && \
    chown -R appuser:appgroup /usr/local/lib/node_modules && \
    chown -R appuser:appgroup /usr/local/bin

# Copy built assets from builder and set permissions
COPY --from=builder --chown=appuser:appgroup /app/build ./build

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
