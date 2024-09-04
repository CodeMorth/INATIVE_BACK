import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Meet } from './meet.model'
import { Gender } from './gender.model'

export const GenderXMeet = InnativeDB.define('gender_x_meet', {
    id_gender_x_meet: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_meet: {
    type: DataTypes.INTEGER,
    references: {
      model: Meet,
      key: 'id_meet'
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
