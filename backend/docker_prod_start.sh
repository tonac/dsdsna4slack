python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
/usr/local/bin/gunicorn backend.wsgi:application -w 1 -b :8000
