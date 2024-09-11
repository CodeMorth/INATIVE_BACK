import { Request, Response, NextFunction } from 'express'
import { createChatService, getChatsByUserIdService } from '../services'

export const createChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await createChatService(req.body)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const getChatsByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const {id_user}= req.params

  console.log("Soy el id_user",id_user)

  try {
    const response = await getChatsByUserIdService(id_user)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
