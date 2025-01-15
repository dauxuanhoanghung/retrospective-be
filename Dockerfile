# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.18

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

FROM base AS deps

RUN apk add --no-cache python3 make g++ 

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

RUN npm rebuild bcrypt --build-from-source

FROM deps AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build

FROM base AS final

ENV NODE_ENV=production

USER node

COPY --chown=node:node package.json .
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD ["npm", "start", "--ignore-scripts"]
