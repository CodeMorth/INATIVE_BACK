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
      port: parseInt(DB_PORT, 10), // Convierte el puerto a número
      dialect: 'mysql',
      logging:false,
      dialectOptions:{ssl:{require:true,rejectUnauthorized:false}}

    }
  )
  

export default InnativeDB