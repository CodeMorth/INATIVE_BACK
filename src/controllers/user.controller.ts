import { Request, Response, NextFunction } from 'express'
import {
  deleteUsersService,
  getAllUserService,
  getDataTokenService,
  getUsersService,
  loginUserService,
  logoutUserService,
  registerUsersService,
  updateUserService
} from '../services'

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await registerUsersService(req.body)

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

export const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Casting explícito para indicarle a TypeScript que `req.headers.authorization` es una cadena o undefined
  const authHeader =
    (req.headers['authorization'] as string | undefined) ?? 'unauthorized'

  // Extraer el token del encabezado Authorization (Bearer token)
  const token = authHeader.split(' ')[1] // "Bearer <token>"

  try {
    const response = await logoutUserService(token)

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

export const getAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getAllUserService()

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}
