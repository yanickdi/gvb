#!/usr/bin/env python

from werkzeug.serving import run_simple

from app import application

run_simple('localhost', 8000, application=application, use_reloader=True, use_evalex=True, use_debugger=True)
