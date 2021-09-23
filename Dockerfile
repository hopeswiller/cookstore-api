# ---------- Base ------------
FROM node:16-alpine3.14 as base

LABEL maintainer="hopeswiller_ <davidba941@gmail.com>"
LABEL description="CookStore API"

WORKDIR /home/node/app

ARG DB_NAME
ENV DB_NAME=${DB_NAME}

ARG DB_USER
ENV DB_USER=${DB_USER}

ARG DB_HOST
ENV DB_HOST=${DB_HOST}

ARG DB_PASSWD
ENV DB_PASSWD=${DB_PASSWD}

ARG DB_PORT
ENV DB_PORT=${DB_PORT}

ARG LOG_LEVEL=info
ENV LOG_LEVEL=${LOG_LEVEL}

# ---------- Builder ----------
FROM base AS builder

COPY package*.json .babelrc.json ./
RUN npm install

COPY ./src ./src

RUN npm run build
# Remove dev dependencies
RUN npm prune --production 


# ---------- Release -----------
FROM base AS release

COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist

USER node

EXPOSE 5000
CMD ["node", "./dist/src/app.js"]
