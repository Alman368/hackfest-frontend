#!/bin/sh

# Script de entrada para sustituir variables de entorno en nginx.conf
# y luego iniciar nginx

# Valor por defecto para BACKEND_URL si no está definido
BACKEND_URL=${BACKEND_URL:-"https://hackfest-backend-production.up.railway.app"}

echo "Configurando nginx con BACKEND_URL: $BACKEND_URL"

# Reemplazar la variable $BACKEND_URL en el archivo de configuración de nginx
sed -i "s|\$BACKEND_URL|$BACKEND_URL|g" /etc/nginx/nginx.conf

echo "Configuración de nginx actualizada:"
echo "=================================="
grep -A 5 -B 5 "proxy_pass" /etc/nginx/nginx.conf | head -20
echo "=================================="

# Iniciar nginx
exec nginx -g "daemon off;"
