# Installation guide

1. Install packages for python and virtual environment,
    - `sudo apt-get install python3 python3-venv`
1. Go to directory where you want to create virtual environment for python and it's packages
    - `cd [path]/dsdsna4slack/backend`
1. Create virtual environment for python
    - `python3 -m venv venv`
1. Run virtual environment
    - `source venv/bin/activate`
1. Install python packages we use
    - `pip install -r requirements.txt`
1. If running with **local database** create tables, for now always.
    - `python manage.py migrate`


# Running guide

1. Make sure your virtual environment is activated
    - `cd [path]/dsdsna4slack/backend && source venv/bin/activate`
1. Run django development server, by default it will run server at localhost:8000
    - `python manage.py runserver`


# Usage

Currently you can see all available apis on following address if you are running it locally: localhost:8000/apis/
