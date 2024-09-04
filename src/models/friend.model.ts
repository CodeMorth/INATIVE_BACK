import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const Friend = InnativeDB.define('friend', {
  id_friend: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  in_id_user_friend: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
