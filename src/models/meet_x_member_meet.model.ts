import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { Meet } from './meet.model'
import { Member_meet } from './member_meet.model'

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
      model: Member_meet,
      key: 'id_member_meet'
    }
  }
})
