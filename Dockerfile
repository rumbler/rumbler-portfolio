# Serve stage
FROM node:20-alpine

# Create non-root user
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup appuser

# Set working directory
WORKDIR /app

# Install serve globally and set permissions
RUN npm install -g serve && \
    chown -R appuser:appgroup /usr/local/lib/node_modules && \
    chown -R appuser:appgroup /usr/local/bin

# Copy pre-built assets from Nexus artifact
COPY --chown=appuser:appgroup build ./build

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "build"]
