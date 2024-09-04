import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'
import { User, Objective } from './'

export const UserXObjective = InnativeDB.define('user_x_objective', {
  id_user_x_objective: {
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
  id_objective: {
    type: DataTypes.INTEGER,
    references: {
      model: Objective,
      key: 'id_objective'
    }
  }
})
