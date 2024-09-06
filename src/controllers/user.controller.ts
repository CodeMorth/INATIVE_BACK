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
    console.log('controller req.body', req.body)

    await registerUsersService(req.body)

    res.status(201).json()
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
    const responseUpdate = await loginUserService(req.body)

    res.status(201).json(responseUpdate)
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

  console.log('id_user', id_user)  

  console.log('req.body', req.body)

  console.log('req.header', req.header)


  console.log('req.files', req.files)

  try {
    const responseUpdate = await updateUserService(id_user, req.body, req.files)

    res.status(201).json(responseUpdate)
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

  console.log('token', token)

  try {
    const response = await getDataTokenService(token)

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
