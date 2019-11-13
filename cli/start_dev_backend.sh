#!/usr/bin/env bash
cd backend || exit
php -S localhost:8000 -t public public/index.php