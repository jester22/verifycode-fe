FROM node:12-alpine
WORKDIR /verifycode-fe

COPY . .
RUN yarn install
RUN yarn build
CMD yarn serve
