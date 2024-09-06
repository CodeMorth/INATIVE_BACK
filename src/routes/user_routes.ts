import { Router } from 'express'
import {
  deleteUserController,
  getUserByTokenController,
  getUserController,
  loginUserController,
  registerUserController,
  updateUserController
} from '../controllers'
import { createUploadMiddleware } from '../middleware'
import { authenticate } from '../middleware/auth.midleware'

export const UserRouter = Router()

UserRouter.post('/registerUser', registerUserController)
UserRouter.post('/loginUser', loginUserController)
UserRouter.put(
  '/uploadUser/:id_user',
  authenticate,
  createUploadMiddleware([{ name: 'avatar', maxCount: 1 }]),
  updateUserController
)
UserRouter.get('/getUser/:id_user',authenticate,getUserController)
UserRouter.delete('/deleteUser/:id_user',authenticate, deleteUserController)
UserRouter.get('/getUserByToken/:token', getUserByTokenController)
