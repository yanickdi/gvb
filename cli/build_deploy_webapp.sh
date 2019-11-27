#!/bin/bash
source env/secrets.sh

build() {
  (
    echo "BUILDING FRONTEND"
    cd frontend || exit
    yarn build
  )
}

deploy(){
  echo "DEPLOYING FRONTEND"
  rsync -a frontend/build/ $REMOTE_SERVER:$REMOTE_ROOT/www-root

  echo "DEPLOYING BACKEND"
  # TODO: do not copy vendor files, instead copy them on the server side

  # copy app requirements
  rsync -a backend/requirements.txt $REMOTE_SERVER:$REMOTE_ROOT/api

  # copy startapp-cgi.py script
  rsync -a backend/startapp-cgi.py $REMOTE_SERVER:$REMOTE_ROOT/api

  # copy .htaccess
  rsync -a backend/.htaccess $REMOTE_SERVER:$REMOTE_ROOT/api/www-root

  # copy migration files
  rsync -a backend/migrations $REMOTE_SERVER:$REMOTE_ROOT/api

  # copy app
  rsync -a backend/app $REMOTE_SERVER:$REMOTE_ROOT/api
}

build
deploy
