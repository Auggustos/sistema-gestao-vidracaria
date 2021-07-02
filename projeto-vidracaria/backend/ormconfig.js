require('dotenv/config');

const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "dist"

module.exports = {
  "type": "mysql",
  "host": "mysql742.umbler.com",
  "port": 41890,
  "username": "jpedrojos",
  "password": "Jpacmed2399*",
  "database": "bancoov",
  "entities": [rootDir + "/modules/**/infra/typeorm/entities/*.{js,ts}"],
  "migrations": [rootDir + "/shared/infra/typeorm/migrations/*.{js,ts}"],
  "cli": {
    "migrationsDir": rootDir + "/shared/infra/typeorm/migrations"

  }
}
