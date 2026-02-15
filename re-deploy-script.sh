#!/bin/bash

docker-compose down

docker-compose system prune -f

docker-compose up -d --build

