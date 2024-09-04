import { Router } from "express";
import { registerUser } from "../controllers";

export const UserRouter = Router()

UserRouter.post("/register",registerUser)