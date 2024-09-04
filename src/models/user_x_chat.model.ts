import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Chat } from './chat.model'
import { User } from './user.model'

export const UserXChat = InnativeDB.define('user_x_chat', {
    id_user_x_chat: {
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
  id_chat: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat,
      key: 'id_chat'
    }
  }
})
