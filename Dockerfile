# syntax=docker/dockerfile:1
# 포트폴리오(정적 사이트) 이미지: Node 로 빌드한 dist/ 를 nginx 가 서빙한다.
# 서버에서는 hdg3383.com 의 Caddy 가 HTTPS 를 끝내고 이 컨테이너(80)로 넘긴다 (company-cms/deploy/Caddyfile).
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
