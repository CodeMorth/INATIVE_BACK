import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { DBConfig } from '../interface/DBConfig'

dotenv.config()


const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } =
  process.env as unknown as DBConfig

const InnativeDB = new Sequelize(
  DB_DATABASE, // database name
  DB_USERNAME, // username
  DB_PASSWORD, // password
  {
    host: DB_HOST,
    port: DB_PORT, // port should be a number, not a string
    dialect: 'mysql'
  }
)

export default InnativeDB

// const DB_DATABASE = process.env.DB_DATABASE ?? 'inative'
// const DB_USERNAME = process.env.DB_USERNAME ?? 'root'
// const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root'
// const DB_HOST = process.env.DB_HOST ?? "localhost"
// const PORT = process.env.PORT ?? 8000
