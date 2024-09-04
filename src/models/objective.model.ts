import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const Objective = InnativeDB.define('objective', {
    id_objective: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  objective_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})