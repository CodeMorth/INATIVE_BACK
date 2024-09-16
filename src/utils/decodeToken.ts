import { ErrorOwn } from './ErrorOwn';
import dotenv from 'dotenv';
import jwt, { Algorithm } from 'jsonwebtoken';

dotenv.config();

export const decodeToken = async (token: string) => {
  const { JWT_SECRET, JWT_ALGORITHMS } = process.env;

  // Verifica que las variables de entorno necesarias existan
  if (!JWT_SECRET || !JWT_ALGORITHMS) {
    throw ErrorOwn('Error de variables de entorno', 500);
  }

  // Verifica si el token fue proporcionado
  if (!token) {
    throw ErrorOwn('No existe token', 401); // Código de error 401 - Unauthorized
  }

  try {
    // Decodifica el token con los algoritmos permitidos
    const dataDecoded: any = jwt.verify(token, JWT_SECRET, {
      algorithms: JWT_ALGORITHMS.split(',') as Algorithm[]
    });


    return dataDecoded.userToken;
  } catch (error: any) {
    // Maneja el caso específico de token expirado
    if (error.name === 'TokenExpiredError') {
      throw ErrorOwn('Token expirado, por favor vuelva a iniciar sesión.', 401); // 401 Unauthorized
    }

    // Para otros errores de token
    throw ErrorOwn('Hubo un error al decodificar el token: ' + error.message, 498); // Código 498 - Token inválido
  }
};
