#!/usr/bin/env bash

source backend/env/bin/activate
export FLASK_APP=app/application.py
export FLASK_ENV=development
cd backend