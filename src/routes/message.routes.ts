import { Router } from 'express'
import { createMessageController } from '../controllers'
import { authenticate } from '../middleware/auth.midleware'

export const MessageRouter = Router()

MessageRouter.post('/createMessage', authenticate, createMessageController)
