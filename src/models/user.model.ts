import { DataTypes } from 'sequelize'
import InnativeDB from '../config/database'

export const User = InnativeDB.define<any>('user', {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dt_birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'client'],
    allowNull: false,
    defaultValue: 'client'
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  english_level: {
    type: DataTypes.ENUM,
    values: ['1', '2', '3', '4'],
    allowNull: true
  },
  range_age: {
    type: DataTypes.ENUM,
    values: ['18-25', '26-35', '36-45', '46-60'],
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
    allowNull: true
  },
  objetives: {
    type: DataTypes.ENUM,
    values: ['Study', 'Hobby', 'Professional', 'Other'],
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM,
    values: ['connected', 'disconnected']
  }
})
