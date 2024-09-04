import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User, Meet } from './'

export const UserXMeet = InnativeDB.define('user_x_meet', {
  id_user_x_meet: {
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
  id_meet: {
    type: DataTypes.INTEGER,
    references: {
      model: Meet,
      key: 'id_meet'
    }
  }
})
