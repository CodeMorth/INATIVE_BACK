import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User } from './user.model'
import { Language } from './language.model'

export const UserxLanguage = InnativeDB.define('user_x_language', {
    user_x_language: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  id_language: {
    type: DataTypes.INTEGER,
    references: {
      model: Language,
      key: 'id_language'
    }
  }
})
