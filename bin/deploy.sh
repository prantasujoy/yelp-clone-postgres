#! /bin/bash

if [[ $1 = "prod" ||  $1  = "dev" ]] && [[ $2 = "down" || $2 = "up" ]]; then

    cd ..

    fileEnv="docker-compose.${1}.yaml"
    downOrUp=$2
    build=""

    if [[ $# -eq 3 && $3 = "build" ]]; then
        build="--build"
    fi

    echo "Running docker compose -f docker-compose.yaml -f $fileEnv $downOrUp $build"

    docker compose -f docker-compose.yaml -f $fileEnv $downOrUp $build

else
    echo "Need to follow format ./deploy.sh prod|dev down|up [build]"
fi
