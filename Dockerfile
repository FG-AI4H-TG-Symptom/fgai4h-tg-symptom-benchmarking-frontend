# Building stage
# Just builds the app.
FROM node:alpine as builder

ARG REACT_APP_BACKEND_BASE_URL

ENV REACT_APP_BACKEND_BASE_URL ${REACT_APP_BACKEND_BASE_URL}

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./public ./public
COPY ./.env.development ./.env.development

RUN npm run build


# Running stage
# Copies build artifacts from building stage. This is the final container we can run and deploy.
FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html