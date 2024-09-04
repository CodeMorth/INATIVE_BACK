import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const EnglishLevel = InnativeDB.define('englishLevel', {
    id_english_level: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  level_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
