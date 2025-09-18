# ===========================================
# STAGE 1: BUILD STAGE
# ===========================================
FROM node:24-alpine AS builder

# Install pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
    chmod +x /bin/pnpm

# Set working directory
WORKDIR /app

# Configure pnpm environment
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Setup pnpm directories
RUN mkdir -p ${PNPM_HOME}

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (dev + prod)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Build the application
RUN pnpm build

# ===========================================
# STAGE 2: PRODUCTION STAGE
# ===========================================
FROM node:24-alpine AS production

<<<<<<< HEAD
# Install pnpm, curl and configure user system
RUN apk add --no-cache curl && \
    wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
=======
# Install pnpm and configure user system
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
>>>>>>> origin/development
    chmod +x /bin/pnpm && \
    addgroup -S -g 1001 appgroup && \
    adduser -S -u 1001 -G appgroup appuser

# Set working directory
WORKDIR /app

# Configure pnpm environment
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Setup pnpm directories and permissions
RUN mkdir -p ${PNPM_HOME} && \
    chown -R appuser:appgroup ${PNPM_HOME} /usr/local/bin

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Copy server file
COPY src/server.js .

# Set file permissions
RUN chmod 555 ./build ./server.js

# Switch to non-root user
USER appuser

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV PRODUCTION_DOMAIN=""

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start command
CMD ["node", "server.js"]