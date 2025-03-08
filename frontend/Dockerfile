FROM node:20-alpine AS base

FROM base AS development
WORKDIR /src

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]

