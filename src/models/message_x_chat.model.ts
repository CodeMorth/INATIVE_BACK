import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Chat, Message } from './'

export const MessageXChat = InnativeDB.define('message_x_chat', {
  id_message_x_chat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_message: {
    type: DataTypes.INTEGER,
    references: {
      model: Message,
      key: 'id_message'
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
