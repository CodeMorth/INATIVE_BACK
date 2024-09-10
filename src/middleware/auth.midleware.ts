import { decodeToken } from '../utils/decodeToken'
import { ErrorOwn } from '../utils/ErrorOwn'
import { NextFunction, Response } from 'express'

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return next(ErrorOwn('No existe token en los headers', 401))
    }

    const decoded = await decodeToken(token)
    req.user = decoded
    next()
  } catch (error) {
    next(ErrorOwn('Token invalido', 498))
  }
}
