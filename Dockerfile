FROM python:3.11

WORKDIR /achei_barato

COPY ./api/requirements.txt /achei_barato/api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /achei_barato/api/requirements.txt


COPY ./api /achei_barato/api

CMD ["cd", "api", "&&", "alembic", "upgrade", "head"]