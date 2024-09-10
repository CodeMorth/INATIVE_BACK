import { app } from '../app'
import InnativeDB from '../config/database'
import { initModels } from '../models'
import dotenv from 'dotenv'
import http from 'http'
import { configureSocket } from '../socketIo/socket'

dotenv.config()

initModels()

InnativeDB.sync().then(() => console.log('Data Base conected'))

const PORT = process.env.PORT ?? 8000

const serverHttp = http.createServer(app)

configureSocket(serverHttp)

// Iniciar el servidor
serverHttp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
