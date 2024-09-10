import {
  LoginUserType,
  RegisterUsersType,
  UpdateUserType
} from '../interface/variety'
import { MulterFile, MulterFiles } from '../interface/variety/upload_interface'
import { User } from '../models'
import { ErrorOwn } from '../utils/ErrorOwn'
import { sendMail } from '../utils/sendMailer'
import { uploadAvatars } from '../utils/uploadAvatars'
import bcrypt from 'bcrypt'
import jwt, { Algorithm } from 'jsonwebtoken'

export const registerUsersService = async (userData: RegisterUsersType) => {
  const { user_name, full_name, email, password, dt_birthdate } = userData

  if (!user_name || !full_name || !email || !password || !dt_birthdate)
    throw ErrorOwn('Faltan datos')

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      user_name: user_name,
      full_name: full_name,
      email: email,
      password: hashedPassword,
      dt_birthdate: dt_birthdate
    })

    await sendMail(email, `Bienvenido a Inative`, user_name)

    return { message: 'Usuario creado correctamente' }
  } catch (error) {
    throw ErrorOwn('No se pudo crear el usuario')
  }
}

export const loginUserService = async (userData: LoginUserType) => {
  const { email, password } = userData

  if (!email || !password) throw ErrorOwn('Faltan datos')

  try {
    const user: any = await User.findOne({ where: { email: email } })

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword || !user) throw ErrorOwn('Correo/Contraseña incorrecta', 401)

    const { JWT_SECRET, JWT_ALGORITHMS, JWT_EXPIRESIN } = process.env

    const userToken = user.toJSON()

    delete userToken.password

    const token = jwt.sign(
      {
        userToken
      },
      JWT_SECRET!,
      {
        algorithm: JWT_ALGORITHMS as Algorithm,
        expiresIn: JWT_EXPIRESIN,
        noTimestamp: true
      }
    )

    return { token: token }
  } catch (error) {
    throw ErrorOwn('No se pudo logear de manera correcta')
  }
}

export const updateUserService = async (
  userId: string,
  userData: UpdateUserType,
  files: MulterFiles | MulterFile[] | undefined
) => {
  if (!userId) throw ErrorOwn('Falta el id del usuario')

  try {
    // Si se proporciona un archivo, subirlo a Cloudinary
    const avatarMoment = await uploadAvatars(files)

    // Actualizar los datos del usuario
    Object.assign(userData, avatarMoment)

    // Actualizar el usuario en la base de datos
    const [updatedCount] = await User.update(userData, {
      where: { id_user: userId }
    })

    if (updatedCount === 0) {
      throw ErrorOwn('No se encontró un dato para actualizar')
    }

    // Devolver el mensaje de éxito
    return { message: 'Usuario actualizado correctamente' }
  } catch (error) {
    // Manejo de errores
    throw ErrorOwn('No se pudo actualizar el usuario de manera correcta')
  }
}

export const getUsersService = async (idUser: string) => {
  if (!idUser) throw ErrorOwn('Falta el id del usuario')

  try {
    const user = await User.findByPk(idUser)

    if (!user) {
      throw ErrorOwn('Usuario no encontrado')
    }

    return user
  } catch (error) {
    throw ErrorOwn(`Error al buscar el usuario`)
  }
}

export const deleteUsersService = async (idUser: string) => {
  if (!idUser) throw ErrorOwn('Falta el id del usuario')

  try {
    const deletedRows = await User.destroy({
      where: {
        id_user: idUser
      }
    })

    if (deletedRows === 0) {
      throw ErrorOwn('Usuario no encontrado')
    }

    return { message: 'Usuario eliminado correctamente' }
  } catch (error) {
    throw ErrorOwn('Error al eliminar el usuario')
  }
}

export const getDataTokenService = (token: string) => {
  if (!token) throw ErrorOwn('Falta el token')

  try {
    const { JWT_SECRET, JWT_ALGORITHMS } = process.env
    if (!JWT_SECRET || !JWT_ALGORITHMS) {
      throw ErrorOwn('JWT_SECRET o JWT_ALGORITHMS no estan definidas')
    }

    const dataDecoded: any = jwt.verify(token, JWT_SECRET, {
      algorithms: JWT_ALGORITHMS.split(',') as Algorithm[]
    })

    delete dataDecoded.exp

    return dataDecoded
  } catch (error) {
    throw ErrorOwn('Token invalido o expirado')
  }
}
