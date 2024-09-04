import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const Meet = InnativeDB.define('meet', {
  id_meet: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  url_meet: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_admin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type_meet: {
    type: DataTypes.ENUM,
    values: ['public', 'private'],
    allowNull: true,
    defaultValue: 'public'
  }
})
