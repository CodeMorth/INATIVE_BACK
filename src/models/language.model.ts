import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const Language = InnativeDB.define<any>('language', {
    id_language: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name_language: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
