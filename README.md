# Chatty API

[![Build Status](https://travis-ci.org/rodrigowirth/chatty-api.svg?branch=master)](https://travis-ci.org/rodrigowirth/chatty-api)

## Requirements
- Docker 17.06.0+
- Docker Compose 1.14.0+

## Installing node dependencies (required for running tests and application)
- `docker-compose run api npm install`

## Running the tests
- `docker-compose run api npm test`

## Running the application
- `docker-compose up`
- Wait for the start up
- Chatty API will be available at http://localhost:3000
