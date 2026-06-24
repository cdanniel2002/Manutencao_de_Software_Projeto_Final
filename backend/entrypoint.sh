#!/bin/bash
set -e

# No docker-compose local o banco fica no host "db". Esperamos ele subir.
# No Render a variavel RENDER=true esta presente e o Postgres ja esta
# disponivel via DATABASE_URL, entao pulamos essa espera.
if [ -z "$RENDER" ]; then
  DB_WAIT_HOST="${DB_HOST:-db}"
  DB_WAIT_PORT="${DB_PORT:-5432}"
  echo "Aguardando o banco em ${DB_WAIT_HOST}:${DB_WAIT_PORT}..."
  for _ in $(seq 1 60); do
    if nc -z "$DB_WAIT_HOST" "$DB_WAIT_PORT" 2>/dev/null; then
      echo "Banco disponivel."
      break
    fi
    sleep 0.5
  done
fi

echo "Aplicando migracoes..."
python manage.py migrate --noinput

echo "Coletando arquivos estaticos..."
python manage.py collectstatic --noinput

echo "Garantindo usuario admin..."
python manage.py ensure_admin || true

# Se um comando foi passado (ex.: docker-compose define o gunicorn), executa ele.
# Caso contrario (Render), sobe o gunicorn na porta fornecida em $PORT.
if [ "$#" -gt 0 ]; then
  exec "$@"
else
  exec gunicorn config.wsgi --bind "0.0.0.0:${PORT:-8000}" --workers 3
fi
