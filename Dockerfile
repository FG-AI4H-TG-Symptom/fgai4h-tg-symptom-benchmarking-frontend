# Building stage
# Just builds the app.
FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

RUN npm run build


# Running stage
# Copies build artifacts from building stage. This is the final container we can run and deploy.
FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/build /usr/share/nginx/html
