#!/usr/bin/env bash

source backend/env/bin/activate

source env/secrets.sh

export FLASK_APP=app/application.py
export FLASK_ENV=development
cd backend