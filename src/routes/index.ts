import {Express} from "express"
import { UserRouter } from "./user_routes"

export const apiRoutes = (app:Express ) =>{

    app.use(UserRouter)


}