FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

RUN npm run build

# Test stage
FROM build-stage as test

COPY . .

RUN CI=true npm test

# Prod stage
FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html