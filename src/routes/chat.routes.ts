import { Router } from 'express'
import { createChatController } from '../controllers'
import { authenticate } from '../middleware/auth.midleware'

export const ChatRouter = Router()

ChatRouter.post('/createChat', authenticate, createChatController)
