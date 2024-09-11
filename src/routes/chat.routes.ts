import { Router } from 'express'
import { createChatController, getChatsByUserIdController } from '../controllers'
import { authenticate } from '../middleware/auth.midleware'

export const ChatRouter = Router()

ChatRouter.post('/createChat', authenticate, createChatController)
ChatRouter.get('/getChatsByUserId/:id_user', getChatsByUserIdController)
