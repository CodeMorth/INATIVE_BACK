import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const Chat = InnativeDB.define('chat', {
    id_chat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_user_admin: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
