import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { ChatType } from '../interface/models/Chat.interface'

export const Chat = InnativeDB.define<ChatType>('chat', {
    id_chat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})
