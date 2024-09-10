import { Request, Response, NextFunction } from 'express'
import { createChatService } from '../services'

export const createChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newChat = await createChatService(req.body)
    res.status(201).json(newChat)
  } catch (error) {
    next(error)
  }
}
