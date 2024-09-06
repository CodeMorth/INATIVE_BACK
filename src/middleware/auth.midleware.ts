import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { decodeToken } from '../utils/decodeToken'

dotenv.config()

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    // recuperar el token
    const token = req.headers.authorization.split(' ')[1]
    console.log('Soy el token del middleware', token)

    // Bearer eyJhbGciO => ['Berarer', 'eyJhbGciO...']
    if (!token) {
      return next({
        status: 401,
        errorName: 'No token',
        error: 'No token present in headers'
      })
    }

    // verificar el token
    // si el token es válido => nos decodifica la informacion y devuelve el objeto con la info del usuario
    // si no es valido lanza una excepción -> que tenemos que manejarla con un catch
    const decoded = decodeToken(token)

    console.log('Soy el decoded del middleware', decoded)


    //? un middleware puede modificar el objeto request
    req.user = decoded
    next()
  } catch (error) {
    next({
      status: 498,
      errorName: 'Invalid token',
      error
    })
  }
}
