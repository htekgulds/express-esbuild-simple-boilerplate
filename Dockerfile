FROM node:lts-slim AS builder

WORKDIR /source
COPY package*.json ./

# download dependencies for building
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:lts-slim AS runner

WORKDIR /app
COPY package*.json ./

# download dependencies for running
# we omit dev dependencies because they are only needed for building
# 2.5 mb vs 55mb size difference on empty project
RUN npm i --omit=dev

COPY --from=builder /source/dist/ .

ENTRYPOINT ["node", "index.js"]