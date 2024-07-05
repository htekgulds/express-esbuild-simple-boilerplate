FROM cgr.dev/chainguard/node:latest-dev AS builder
WORKDIR /source

COPY package*.json ./

# download dependencies for building
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM cgr.dev/chainguard/node:latest-dev AS installer

WORKDIR /source
COPY package*.json ./

# download dependencies for running
# we omit dev dependencies because they are only needed for building
# 2.5 mb vs 55mb size difference on empty project
RUN npm i --omit=dev

FROM cgr.dev/chainguard/node:latest AS runner

WORKDIR /app
COPY --from=builder /source/dist/ .
COPY --from=installer /source/node_modules .

ENTRYPOINT ["node", "index.js"]