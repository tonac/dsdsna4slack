FROM python:3.6.3-jessie

ADD requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app/

CMD /bin/sh docker_dev.sh
