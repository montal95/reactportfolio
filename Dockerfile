# Production Dockerfile — serves SPA with `serve` (SPA routing + compression)
FROM node:22-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Install serve globally
RUN npm install -g serve

# Copy pre-built assets
COPY --chown=appuser:appgroup dist ./dist

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Serve with SPA mode (-s): all non-asset requests fall through to index.html
CMD ["serve", "-s", "dist", "-l", "3000"]
