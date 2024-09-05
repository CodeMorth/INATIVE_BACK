import { Router } from 'express'
import { registerUserController, updateUserService } from '../controllers'
import { createUploadMiddleware } from '../middleware'

export const UserRouter = Router()

UserRouter.post('/registerUser', registerUserController)
UserRouter.put(
  '/uploadUser/:id_user',
  createUploadMiddleware([{ name: 'avatar', maxCount: 1 }]),
  updateUserService
)
