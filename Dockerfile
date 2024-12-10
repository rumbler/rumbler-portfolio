# Serve stage
FROM node:20-alpine

# Install pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

# Create non-root user
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup appuser

# Set working directory
WORKDIR /app

# Set up pnpm environment
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN mkdir -p ${PNPM_HOME}

# Install serve globally and set permissions
RUN pnpm add -g serve && \
    chown -R appuser:appgroup ${PNPM_HOME} && \
    chown -R appuser:appgroup /usr/local/bin

# Copy pre-built assets from Nexus artifact
COPY --chown=appuser:appgroup build ./build

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "build"]
