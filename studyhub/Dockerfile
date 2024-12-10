# 1단계: React 앱 빌드
FROM node:latest as build

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

# 2단계: Nginx 설정
FROM nginx:alpine

# Nginx 설정 파일을 커스터마이즈 할 수 있도록 복사
COPY nginx.conf /etc/nginx/nginx.conf

# HTTPS용 SSL 인증서와 키 파일을 복사
COPY ./ssl/fullchain.pem /etc/nginx/ssl/chain.pem
COPY ./ssl/privkey.pem /etc/nginx/ssl/privkey.pem

# React 빌드 결과물을 Nginx로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 빌드된 파일에 대해 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 포트 443에서 HTTPS를 사용하도록 설정
EXPOSE 443

# Nginx를 시작하는 명령
CMD ["nginx", "-g", "daemon off;"]
