# BDEO Challenge

- always use camelCase
- Follow ES6+ Javascript standards

### Information Important

1. [Project structure](#projectstructure)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [backend-config](#backend-config)
5. [populate-db](#populate-db)
6. [dockerized](#dockerized)
7. [runing-apps](#runing-apps)
8. [start frontend](#startfront)
9. [start backend](#startback)
10. [test coverage](#unittest)

## Project Structure

<a name="projectstructure"/>

The structure of this project defined by folders with specific purpose

```
.
├── ...
├──                  # mean fullstack project
│   ├── backend                     # Folder API REST Express
│   ├── frontend                    # Folder Ang App Angular
│   ├── docker-compose.yml
│   ├── gitignore
│   ├── package.json
└──...
```

## Frontend

<a name="frontend"/>

The structure of this project defined by folders with specific purpose, inside a frontend folder you can see all the distribution, all items are related with each purpose.

## Backend

<a name="backend"/>

The structure of this project defined by folders with specific purpose.

```
.
├── ...
├── backend                     # Express API Rest
│      ├── src
│           ├── mdw             # midlewware
│           ├── routes          # routes
│           ├── config          # headers, config cors and more
│           ├── controllers     # controllers
│           ├── models          # mongo database models
│           ├── services        # logic bussiness
│           ├── utils           # utils functions, methods
│           ├── helpers         # helpers functions, methods
│           ├── app.ts          # api express core
│           ├── index.js        # wrapper api express core
│   └── ...                     # etc.
└──...
```

## Backend-config

<a name="backend-config"/>
for backend you must config at least one .env.<enviroment-name>.local files, this API supports 3 enviroments files (.env.test.local, .env.development.local and .env.production.local). You have a sample.env config and check it please.

Important create all 3 .env files, for PRODUCTION .env.production.local on variable `DB_CNN` use this value `mongodb+srv://rabin:3OnnAhgTd3jJ3rp2@clustercoffedb.r82zt.gcp.mongodb.net/beer_db` it's a cluster from mongoAtlas (latter on review this code delete it please)

## populate-db

<a name="populate-db"/>

When you enter in the frontend after you create your account and SignIn you must lounch on the interface for load beers endpoints or you can do it manually with postman. I provide a folder called `postman-collection`, you can import it and run the specific loadBeer endpoint (Method post with empty Body)

## dockerized

<a name="dockerized"/>

You can run all app using `docker-compose up`, and you will see all the info, check the DATABASE CONNECTION it-s related with VARIABLE `DB_CNN` on yours .env files.

## running apps

<a name="runing-apps"/>
you can use d`docker-compose up` or have 2 terminals and running in Development Mode just run `npm start` inside folder frontend and backend

## start frontend

<a name="startfront"/>

run `npm run start` inside on folder `frontend` for start frontend in angular

## start backend

<a name="startback"/>

for backend it's depends which enviroments you wan to run you can choose between:

```
Development
test
Production
```

if you want to start API with development settings you must run `npm run start` for start API REST

if you want to start API with test settings you must run `npm run start-test` for start API REST. this is only need for run unit and functional test

if you want to start API with Production settings you must run `npm run start-prod` for start API REST

## test coverage

<a name="unittest"/>

run `npm run test-coverage` for start all test into backend. WARNING there is a lot test failing, i needed more time
