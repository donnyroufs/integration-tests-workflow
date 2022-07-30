FROM node:16 as base
WORKDIR /app
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn prisma generate

FROM base as test
CMD ["yarn", "test:ci"]

FROM base as build
RUN yarn build
CMD ["node", "dist/src/bootstrap.js"]