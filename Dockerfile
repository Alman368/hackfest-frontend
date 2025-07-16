# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar el script de entrada
COPY entrypoint.sh /entrypoint.sh

# Dar permisos de ejecución al script
RUN chmod +x /entrypoint.sh

# Variable de entorno para la URL del backend
ENV BACKEND_URL=""

# Exponer el puerto 80
EXPOSE 80

# Usar el script de entrada personalizado
ENTRYPOINT ["/entrypoint.sh"]
