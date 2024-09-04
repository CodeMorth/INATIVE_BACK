import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Chat_Member } from './chat_member.model'
import { Chat } from './chat.model'

export const ChatXChatMember = InnativeDB.define('chat_x_chat_member', {
    id_chat_x_chat_member: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_chat_member: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat_Member,
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
