# syntax=docker/dockerfile:1

# ---------- Этап 1: сборка React-приложения ----------
FROM node:20-alpine AS build

WORKDIR /app

# Сначала копируем только манифесты, чтобы кеш слоя зависимостей переиспользовался,
# пока package*.json не меняются.
COPY package*.json ./

# Используем npm ci, если есть package-lock.json (детерминированная установка),
# иначе откатываемся на npm install.
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Копируем остальные исходники и собираем production-бандл.
COPY . .
RUN npm run build

# ---------- Этап 2: продакшн-образ на nginx ----------
FROM nginx:alpine AS production

# Кастомная конфигурация nginx (SPA-fallback на index.html, сжатие и т.п.).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранную статику из этапа build в директорию, которую раздаёт nginx.
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Запускаем nginx в foreground, чтобы Docker корректно отслеживал процесс.
CMD ["nginx", "-g", "daemon off;"]
