import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { EnglishLevel,Meet } from './'

export const EnglishlevelXMett = InnativeDB.define('english_level_x_meet', {
    id_english_level_x_meet: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_meet: {
    type: DataTypes.INTEGER,
    references: {
      model: Meet,
      key: 'id_meet'
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
