import { Router } from 'express'
import {
  createMessageController,
  getMessagesByChatIdController
} from '../controllers'
import { authenticate } from '../middleware/auth.midleware'

export const MessageRouter = Router()

MessageRouter.post('/createMessage', authenticate, createMessageController)
MessageRouter.post(
  '/getMessageByChatId',
  authenticate,
  getMessagesByChatIdController
)
