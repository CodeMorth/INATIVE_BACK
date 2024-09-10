import { ErrorOwn } from './ErrorOwn'
import dotenv from 'dotenv'
const jwt = require('jsonwebtoken')

dotenv.config()

export const decodeToken = async (token: string) => {
  const { JWT_SECRET, JWT_ALGORITHMS } = process.env

  try {
    if (!token) {
      throw ErrorOwn('No existe token', 401)
    }

    const decoded = jwt.verify(token, JWT_SECRET as string, {
      algorithms: [JWT_ALGORITHMS as string]
    })
    return decoded.data
  } catch (error) {
    throw ErrorOwn('Hubo un error al decodificar el token', 498)
  }
}
