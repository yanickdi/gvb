#!/bin/bash
source env/secrets.sh

build() {
  (
    echo "BUILDING FRONTEND"
    cd frontend || exit
    #export PUBLIC_URL="https://yanick.dickbauer.at/fahrplan/"
    yarn build
  )
}

deploy(){
  echo "DEPLOYING FRONTEND"
  rsync -a frontend/build/ $REMOTE_SERVER:$REMOTE_ROOT/www-root

  echo "DEPLOYING BACKEND"
  # TODO: do not copy vendor files, instead copy them on the server side
  rsync -a backend/ $REMOTE_SERVER:$REMOTE_ROOT/api
}

build
deploy
