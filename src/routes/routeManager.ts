import {Express} from "express"
import { ChatRouter, MessageRouter, UserRouter } from "./"

export const apiRoutes = (app:Express ) =>{

    app.use(UserRouter)
    app.use(MessageRouter)
    app.use(ChatRouter)


}