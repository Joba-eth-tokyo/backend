#!/bin/bash

# STDERR log function
err() {
  echo -e "\n[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@\n" >&2
  exit 1
}

# STDOUT log function
log() {
  echo -e "\n[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@\n"
}

# Check if NPM is installed
if ! type "node" >/dev/null 2>&1; then
  err "⛔️ NodeJS not installed"
fi

# Check if yarn is installed
if ! type "yarn" >/dev/null 2>&1; then
  err "⛔️ yarn not installed"
fi

if ! type "psql" >/dev/null 2>&1; then
  err "⛔️ psql not installed"
fi

log "👐 Install dependencies"
yarn install
if [ $? -ne 0 ]; then
  err "⛔️ yarn install failed."
fi

log "↪ Creating database"
if [ -f .env ]; then
  set -o allexport
  source .env set
  +o allexport
  # as it's responding with single value ex: 
  echo $POSTGRES_DB # just print the single variable
fi
 
psql -U $POSTGRES_USER -PW $POSTGRES_PASSWORD -c 'select 1' -d $POSTGRES_DB &>dev/null || psql -U postgres -tc 'create database '$POSTGRES_DB''
 
#Print the value of variable
echo "🍀 Databse created"

log "👐 Create schemas: yarn run schema:sync"
yarn run schema:sync
if [ $? -ne 0 ]; then
  err "⛔️ Schemas failed."
fi

log "👐 Create seed: yarn run seed:run"
yarn run seed:run
if [ $? -ne 0 ]; then
  err "⛔️ Seeding failed."
fi

# log "🐝 Run migrations: yarn run apply:migration"
# yarn run apply:migration
# if [ $? -ne 0 ]; then
#   err "⛔️ Migrations failed."
# fi
