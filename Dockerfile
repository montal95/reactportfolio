# Ultra-lightweight production Dockerfile (uses Python http.server)
FROM python:3.12-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy pre-built assets
COPY --chown=appuser:appgroup build ./build

# Switch to non-root user
USER appuser

WORKDIR /app/build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Serve static files with Python's built-in server
CMD ["python", "-m", "http.server", "3000"]
