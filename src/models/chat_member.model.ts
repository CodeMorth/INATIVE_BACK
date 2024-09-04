import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const ChatMember = InnativeDB.define('chatMember', {
    id_chat_member: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_chat: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
