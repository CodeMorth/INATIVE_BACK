import { Request, Response, NextFunction } from 'express'
import { createLanguageService, getAllLanguagesService } from '../services'

export const createLanguageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await createLanguageService(req.body)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
export const getAllLanguagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getAllLanguagesService()

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
