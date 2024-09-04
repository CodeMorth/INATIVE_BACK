import { User } from '../models'

export const registerUsers = async (userData: any) => {
  const { username, full_name, email, password, dt_birthdate } = userData

  const user = await User.create({
    username,
    full_name,
    email,
    password,
    dt_birthdate
  })

  return user
}
