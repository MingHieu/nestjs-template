# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN yarn

ENV NODE_ENV=production

RUN yarn prisma:prod:generate

RUN yarn build

# Stage 2: Runtime Stage
FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/src ./src

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]