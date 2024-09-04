import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { MemberMeet,Meet } from './'

export const MeetXMembermeet = InnativeDB.define('meet_x_member_meet', {
    id_meet_x_member_meet: {
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
  id_member_meet: {
    type: DataTypes.INTEGER,
    references: {
      model: MemberMeet,
      key: 'id_member_meet'
    }
  }
})
