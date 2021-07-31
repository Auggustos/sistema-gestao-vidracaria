
const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "dist"

module.exports = {
  "type": "mysql",
  "host": "database-2.cdo16xu9mxq8.sa-east-1.rds.amazonaws.com",
  "port": 3306,
  "username": "admin",
  "password": "TesteLina2021",
  "database": "bancoov",
  "entities": [rootDir + "/modules/**/infra/typeorm/entities/*.{js,ts}"],
  "migrations": [rootDir + "/shared/infra/typeorm/migrations/*.{js,ts}"],
  "cli": {
    "migrationsDir": rootDir + "/shared/infra/typeorm/migrations"

  }
}
