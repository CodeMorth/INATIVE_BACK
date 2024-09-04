import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Gender } from './gender.model'
import { User } from './user.model'

export const GenderXUser = InnativeDB.define('gender_x_user', {
    id_gender_x_user: {
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
  id_gender: {
    type: DataTypes.INTEGER,
    references: {
      model: Gender,
      key: 'id_gender'
    }
  }
})
