# Base image
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build the app to the /dist folder
RUN npm run build

# ---

# Production image
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the bundled code from the build stage to the production image
COPY --from=builder /usr/src/app/dist ./dist

# Start the server using the production build
CMD ["node", "dist/main"]
