import { Request, Response, NextFunction } from 'express'
import { createMessageService, getMessagesByChatIdService } from '../services'
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

export const getMessagesByChatIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_chat } = req.params

  try {
    const response = await getMessagesByChatIdService(id_chat)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
