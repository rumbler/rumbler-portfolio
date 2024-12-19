FROM node:20-alpine

# Create non-root user
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup appuser

# Install pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

# Set up pnpm environment
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN mkdir -p ${PNPM_HOME}

# Set working directory
WORKDIR /app

# Set ownership when directory is empty
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Copy package files and install production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built files and server
COPY build/ ./build/
COPY src/server.js ./

# Default environment variables (can be overridden at runtime)
ENV NODE_ENV=production \
    PORT=3000 \
    PRODUCTION_DOMAIN=""

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
