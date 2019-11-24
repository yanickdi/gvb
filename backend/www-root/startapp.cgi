#!/usr/bin/env bash

# activate python env
source /www/htdocs/w01172e4/fahrplan.yanick.dickbauer.at/api/env/bin/activate

# start python cgi script
cd /www/htdocs/w01172e4/fahrplan.yanick.dickbauer.at/api
python startapp-cgi.py
