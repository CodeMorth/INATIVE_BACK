import { Model, Optional } from 'sequelize'

export interface UserAttributesType {
  id_user: number
  user_name: string
  full_name: string
  email: string
  password: string
  last_login: Date
  dt_birthdate: Date
  role: 'admin' | 'client'
  avatar: string
  english_level: '1' | '2' | '3' | '4'
  range_age: '18-25' | '26-35' | '36-45' | '46-60'
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say'
  objetives: 'Study' | 'Hobby' | 'Professional' | 'Other'
}
