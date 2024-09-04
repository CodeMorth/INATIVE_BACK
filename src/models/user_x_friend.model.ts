import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User } from './user.model'
import { Friend } from './friend.model'

export const UserXFriend = InnativeDB.define('user_x_friend', {
  id_user_x_friend: {
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
  id_friend: {
    type: DataTypes.INTEGER,
    references: {
      model: Friend,
      key: 'id_friend'
    }
  }
})
