FROM node:12-alphine
WORKDIR /verifycode-fe

COPY . .
RUN yarn install
RUN yarn build
CMD yarn serve
