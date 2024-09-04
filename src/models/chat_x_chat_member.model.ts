import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { ChatMember,Chat } from './'

export const ChatXChatMember = InnativeDB.define('chat_x_chat_member', {
    id_chat_x_chat_member: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_chat_member: {
    type: DataTypes.INTEGER,
    references: {
      model: ChatMember,
      key: 'id_chat_member'
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
