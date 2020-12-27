# Django + Nuxt boilerplate

Installation:
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
yarn
```

Create .env file and fill it with data:
```
cp .env-example .env
...
```

New backend user:
```
python manage.py createsuperuser
...
```

Client:
```
yarn dev
```

Server:
```
python manage.py runserver 0.0.0.0:4000
```
