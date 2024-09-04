import { app } from '../app'
import InnativeDB from '../config/database'
import { initModels } from '../models'

initModels()

InnativeDB.sync().then(() => console.log('Data Base conected'))

const PORT = process.env.PORT ?? 8000

export const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
