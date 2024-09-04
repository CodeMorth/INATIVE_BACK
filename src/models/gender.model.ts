import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const Gender = InnativeDB.define('gender', {
    id_gender: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
