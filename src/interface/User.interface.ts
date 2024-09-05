import { Optional } from 'sequelize'

export interface RegisterUsersType {
  user_name: string
  full_name: string
  email: string
  password: string
  dt_birthdate: string
  avatar?: Express.Multer.File
}

// Define la interfaz para el modelo de usuario
export interface UserDataToCreate {
  user_name: string
  full_name: string
  email: string
  password: string
  dt_birthdate: string
  avatar?: string // URL de Cloudinary como cadena
}

// Define el tipo para la instancia de usuario
export type CreationUser = Optional<UserDataToCreate, 'avatar'>

export interface UpdateUserType {
  user_name?: string
  full_name?: string
  email?: string
  password?: string
  dt_birthdate?: string
  avatar?: Express.Multer.File | string
}
