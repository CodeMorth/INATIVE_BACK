import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const MemberMeet = InnativeDB.define('memberMeet', {
  id_member_meet: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_meet: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
