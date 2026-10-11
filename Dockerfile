FROM nginx:alpine
RUN printf 'server {\n\
    listen 8000;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location ~ /\\. { deny all; }\n\
    location / { try_files $uri $uri/ /index.html; }\n\
}\n' > /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 8000
