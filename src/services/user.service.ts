import { LoginUserType, RegisterUsersType, UpdateUserType } from '../interface'
import { MulterFile, MulterFiles } from '../interface/upload_interface'
import { User } from '../models'
import { sendMail } from '../utils/sendMailer'
import { uploadAvatars } from '../utils/uploadAvatars'
import bcrypt from 'bcrypt'
import jwt, { Algorithm } from 'jsonwebtoken'

export const registerUsersService = async (userData: RegisterUsersType) => {
  const { user_name, full_name, email, password, dt_birthdate } = userData

  console.log('user data del servicio de registrer', userData)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    user_name: user_name,
    full_name: full_name,
    email: email,
    password: hashedPassword,
    dt_birthdate: dt_birthdate
  })

  await sendMail(email, `Bienvenido a Dev-Friend`, user_name)

  return user
}

export const loginUserService = async (userData: LoginUserType) => {
  const { email, password } = userData

  const user: any = await User.findOne({ where: { email } })

  if (!user) {
    throw new Error(
      'Invalid credentials: incorrect email/password or confirm email'
    )
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new Error('Invalid credentials: incorrect email/password')
  }

  const {
    id_user,
    user_name,
    full_name,
    last_login,
    dt_birthdate,
    role,
    avatar,
    createdAt,
    updatedAt,
    id_gender
  } = user

  const { JWT_SECRET, JWT_ALGORITHMS, JWT_EXPIRESIN } = process.env

  const token = jwt.sign(
    {
      id_user,
      user_name,
      full_name,
      last_login,
      dt_birthdate,
      role,
      avatar,
      createdAt,
      updatedAt,
      id_gender
    },
    JWT_SECRET!,
    {
      algorithm: JWT_ALGORITHMS as Algorithm,
      expiresIn: JWT_EXPIRESIN,
      noTimestamp: true
    }
  )

  return {
    token
  }
}

export const updateUserService = async (
  userId: string,
  userData: UpdateUserType,
  files: MulterFiles | MulterFile[] | undefined
) => {
  if (!userId) {
    throw new Error(
      'Invalid credentials: incorrect email/password or confirm email'
    )
  }

  // Si se proporciona un archivo, subirlo a Cloudinary
  const avatarMoment = await uploadAvatars(files)

  Object.assign(userData, avatarMoment)

  // Actualizar el usuario en la base de datos
  const [userDataRows] = await User.update(userData, {
    where: { id_user: userId },
    returning: true
  })

  if (userDataRows === 0) {
    throw new Error('No se encontro un dato para actualizar')
  }

  // Devolver el usuario actualizado
  return { message: 'Usuario actualizado correctamente' } // Retorna el primer usuario actualizado
}

export const getUsersService = async (idUser: string) => {
  try {
    const user = await User.findByPk(idUser)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    return user
  } catch (error) {
    throw new Error(`Error al buscar el usuario: ${(error as Error).message}`)
  }
}

export const deleteUsersService = async (idUser: string) => {
  try {
    const deletedRows = await User.destroy({
      where: {
        id_user: idUser
      }
    })

    if (deletedRows === 0) {
      throw new Error('Usuario no encontrado')
    }

    return { message: 'Usuario eliminado correctamente' }
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${(error as Error).message}`)
  }
}

export const getDataTokenService = (token: string) => {
  try {
    const { JWT_SECRET, JWT_ALGORITHMS } = process.env
    if (!JWT_SECRET || !JWT_ALGORITHMS) {
      throw new Error(
        'JWT_SECRET or JWT_ALGORITHMS is not defined in environment variables.'
      )
    }

    const dataDecoded: any = jwt.verify(token, JWT_SECRET, {
      algorithms: JWT_ALGORITHMS.split(',') as Algorithm[]
    })

    delete dataDecoded.exp

    return dataDecoded
  } catch (error) {
    throw new Error('Invalid token or expired token.')
  }
}
