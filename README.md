# cookstore-api
Node API with postgres - Vue Frontend

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)

## General info

[ yet to update ]

## Technologies

- Nodejs - version 3.8+
- Passport
- Postgres DB 

## Setup

Setup via Docker which is recommended and simpler.
> Update docker to latest version

- #### Create an .env file with the following vars
``` 
    PORT=
    LOG_LEVEL=debug
    DB_HOST=
    DB_NAME=cookstore
    DB_USER=postgres
    DB_PASSWD=1
    DB_PORT=5432
```
- #### Run the command to start server in dev mode respectively

```
./startApp.dev.sh
```


## Features

List of features ready and TODOs for future development

- [x] CRUD operations on User Account an OTP with expiry time
- [x] CRUD operations on Recipes

## Status

Project is: _in progress_
