import dotenv from 'dotenv'
import { app } from '../app'

const PORT = process.env.PORT ?? 8000

export const server = app.listen(PORT,()=>{

    console.log(`Server running on PORT ${PORT}`)

})