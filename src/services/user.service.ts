import {
  RegisterUsersType,
  UpdateUserType,
} from '../interface'
import { MulterFile, MulterFiles } from '../interface/upload_interface'
import { User } from '../models'
import { uploadAvatars } from '../utils/uploadAvatars'

export const registerUsersService = async (userData: RegisterUsersType) => {
  const { user_name, full_name, email, password, dt_birthdate } = userData

  const user = await User.create({
    user_name: user_name,
    full_name: full_name,
    email: email,
    password: password,
    dt_birthdate: dt_birthdate
  })

  return user
}

export const updateUsers = async (
  userId: string,
  userData: UpdateUserType,
  //error de tipado
  file:  MulterFiles | MulterFile[] | undefined
) => {
  if (!userId) {
    throw new Error(
      'Invalid credentials: incorrect email/password or confirm email'
    )
  }



  // Si se proporciona un archivo, subirlo a Cloudinary
  const avatarMoment = await uploadAvatars(file)

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
