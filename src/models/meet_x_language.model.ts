import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Language, Meet } from './'

export const MeetXLanguage = InnativeDB.define('meet_x_language', {
  user_x_language: {
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
  id_language: {
    type: DataTypes.INTEGER,
    references: {
      model: Language,
      key: 'id_language'
    }
  }
})
