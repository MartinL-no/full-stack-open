FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Test stage
FROM build-stage as test

COPY . .

CMD CI=true npm test

# Prod stage
FROM build-stage as prod

COPY . .

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://localhost:3001/

RUN npm run build
RUN npm install -g serve

CMD ["serve", "build"]