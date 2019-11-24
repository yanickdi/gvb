#!/usr/bin/env bash
source ./cli/load_flask_env.sh

cd backend || exit

flask run