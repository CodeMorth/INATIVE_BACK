import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User } from './user.model'
import { EnglishLevel } from './english_level.model'

export const EnglishlevelXUser = InnativeDB.define('english_level_x_user', {
    id_english_level_x_user: {
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
  id_english_level: {
    type: DataTypes.INTEGER,
    references: {
      model: EnglishLevel,
      key: 'id_english_level'
    }
  }
})
