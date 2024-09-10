import { Request, Response, NextFunction } from 'express'
import { createMessageService } from '../services'
export const createMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createMessageService(req.body)

    res.status(201).json()
  } catch (error) {
    next(error)
  }
}
