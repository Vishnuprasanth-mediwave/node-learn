## DB migrations

Need **sequelize-cli**

- To generate the new migration file

First go inside app directory

> cd app

Then execute whatever command you need

`npx sequelize-cli migration:generate --name <module_name>`

- To upgrade the db

  `npx sequelize-cli db:migrate`

- To upgrade specific migration

  `npx sequelize-cli db:migrate --from <file name> --to <file name>`

- To upgrade n number of migrations

  `npx sequelize-cli db:migrate --to <file name>`

- To downgrade the db

  `npx sequelize-cli db:migrate:undo`

- To downgrade the specific db

  `npx sequelize-cli db:migrate:undo --name <file name>`

- To downgrade the migration untill specific file

  `npx sequelize-cli db:migrate:undo:all --to <file name>`

## DB seeders

- To generate the new seeders file

  `npx sequelize-cli seed:generate --name <module_name>`

- To upgrade the seeders

  `npx sequelize-cli db:seed:all`

- To downgrade the seeders

  `npx sequelize-cli db:seed:undo:all`

- To upgrade specify seed

  `npx sequelize-cli db:seed --seed <file name>`

- To downgrade the specific seed

  `npx sequelize-cli db:seed:undo --seed <file name>`

for more info visit [Documentation](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

## Installation

`npm install`

## Data Sync

- To create database with required data

  `node app/sync.js`

## Start

`npm start`



,,,
{
  "name": "node-pg",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "nodemon"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/mindwaveventures/node-pg.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/mindwaveventures/node-pg/issues"
  },
  "homepage": "https://github.com/mindwaveventures/node-pg#readme",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "fs": "^0.0.1-security",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.0.2",
    "nodemon": "^3.0.1",
    "path": "^0.12.7",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.1"
  },
  "devDependencies": {
    "sequelize-cli": "^6.6.2"
  }
}
,,,