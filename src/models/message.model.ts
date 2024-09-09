import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User } from './user.model'

export const Message = InnativeDB.define('message', {
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
  id_reciever_message: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message_status: {
    type: DataTypes.ENUM,
    values: ['sent', 'received', 'read'],
    allowNull: false,
    defaultValue: 'sent'
  }
})
