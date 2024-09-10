import { Request, Response, NextFunction } from 'express'
import {
  deleteUsersService,
  getDataTokenService,
  getUsersService,
  loginUserService,
  registerUsersService,
  updateUserService
} from '../services'

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const response =  await registerUsersService(req.body)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await loginUserService(req.body)

    res.status(201).json(response)
  } catch (error) {
    next(error)

  }
}

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_user } = req.params

  try {
    const response = await updateUserService(id_user, req.body, req.files)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_user } = req.params

  try {
    const response = await getUsersService(id_user)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_user } = req.params

  try {
    const response = await deleteUsersService(id_user)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

export const getUserByTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params

  try {
    const response = await getDataTokenService(token)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
