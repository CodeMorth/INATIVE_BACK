import {Express} from "express"
import { UserRouter } from "./"

export const apiRoutes = (app:Express ) =>{

    app.use(UserRouter)


}