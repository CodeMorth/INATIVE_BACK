import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Gender } from './gender.model'
import { Chat } from './chat.model'

export const GenderXChat = InnativeDB.define('gender_x_chat', {
    id_gender_x_chat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_chat: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat,
      key: 'id_chat'
    }
  },
  id_gender: {
    type: DataTypes.INTEGER,
    references: {
      model: Gender,
      key: 'id_gender'
    }
  }
})
