export interface RegisterUsersType {
  user_name: string
  full_name: string
  email: string
  password: string
  dt_birthdate: string
  avatar?: Express.Multer.File
}

export interface UpdateUserType {
  user_name?: string
  full_name?: string
  email?: string
  password?: string
  dt_birthdate?: string
  avatar?: Express.Multer.File | string
}

export interface LoginUserType {
  email: string
  password: string
}
