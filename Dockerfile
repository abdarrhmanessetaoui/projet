# Use official Node.js runtime as base image
FROM node:18-alpine

# Create a non-root user FIRST
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory in container
WORKDIR /usr/src/app

# Ensure we have a logs folder and correct permissions
RUN mkdir logs && chown nodejs:nodejs logs

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code with correct owner
COPY --chown=nodejs:nodejs . .

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Switch to non-root user
USER nodejs

# Start the application
CMD ["node", "src/server.js"]