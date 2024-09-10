import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User } from './user.model'
import { MessageType } from '../interface/models'

export const Message = InnativeDB.define<MessageType>('message', {
  id_message: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_sender_message: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  message_status: {
    type: DataTypes.ENUM,
    values: ['sent', 'received', 'read'],
    allowNull: false,
    defaultValue: 'sent'
  }
})
