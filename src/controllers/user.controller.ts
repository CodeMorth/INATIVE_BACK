import { Request, Response, NextFunction } from 'express'
import { registerUsersService, updateUsers } from '../services'

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerUsersService(req.body)

    res.status(201).json()
  } catch (error) {
    next(error)
  }
}

export const updateUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_user } = req.params

//enves de enviar req.file es enviar req.files
  try {
    const responseUpdate =  await updateUsers(id_user, req.body, req.files)

    res.status(201).json(responseUpdate)
  } catch (error) {
    next(error)
  }
}
