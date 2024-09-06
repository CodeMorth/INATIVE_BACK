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
    dialect: 'mysql',

  }
)

export default InnativeDB

    // logging:false,
    // dialectOptions:{ssl:{require:true,rejectUnauthorized:false}}