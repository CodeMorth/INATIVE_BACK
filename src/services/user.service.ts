import {
  LoginUserType,
  RegisterUsersType,
  UpdateUserType
} from '../interface/variety'
import { MulterFile, MulterFiles } from '../interface/variety/upload_interface'
import { Language, User, UserxLanguage } from '../models'
import bcrypt from 'bcrypt'
import jwt, { Algorithm } from 'jsonwebtoken'
import { ErrorOwn, sendMail, uploadAvatars } from '../utils'
import { Op } from 'sequelize'

const { JWT_SECRET, JWT_ALGORITHMS, JWT_EXPIRESIN } = process.env

export const registerUsersService = async (userData: RegisterUsersType) => {
  const { user_name, full_name, email, password, dt_birthdate } = userData

  if (!user_name || !full_name || !email || !password || !dt_birthdate)
    throw ErrorOwn('Faltan datos')

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { user_name: user_name }]
      }
    })

    if (existingUser) throw ErrorOwn('El usuario ya existe')
  } catch (error) {
    throw ErrorOwn('El usuario ya existe')
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario
    const newUser = await User.create({
      user_name: user_name,
      full_name: full_name,
      email: email,
      password: hashedPassword,
      dt_birthdate: dt_birthdate
    })

    // Buscar los lenguajes "English" y "Spanish"
    const languages = await Language.findAll({
      where: {
        name_language: ['English', 'Spanish']
      }
    })

    if (languages.length === 0) {
      throw ErrorOwn('No se encontraron los lenguajes especificados')
    }

    // Crear las asociaciones en la tabla pivote manualmente
    for (const language of languages) {
      await UserxLanguage.create({
        id_user: newUser.id_user, // Ajusta esto si tu campo clave primaria tiene otro nombre
        id_language: language.id_language
      })
    }

    // Enviar correo de bienvenida
    await sendMail(email, `Bienvenido a Inative`, user_name)

    return {
      message: 'Usuario creado correctamente'
    }
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

    if (!validPassword || !user) throw ErrorOwn()

    console.log('user', user)

    const userToken = user.dataValues

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
      throw ErrorOwn()
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
      throw ErrorOwn()
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
      throw ErrorOwn()
    }

    return { message: 'Usuario eliminado correctamente' }
  } catch (error) {
    throw ErrorOwn('Error al eliminar el usuario')
  }
}

export const getDataTokenService = (token: string) => {
  if (!token) throw ErrorOwn('Falta el token')

  try {
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

export const getAllUserService = async () => {
  try {
    const user = await User.findAll({
      attributes: [
        'id_user',
        'full_name',
        'email',
        'last_login',
        'avatar',
        'role',
        'id_gender'
      ]
    })

    if (!user) {
      throw ErrorOwn()
    }

    return user
  } catch (error) {
    throw ErrorOwn(`Error al buscar el usuario`)
  }
}
