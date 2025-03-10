// permission.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';


const Plan = sequelize.define('Plan', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isHexColor: true,
      },
    },
  },
  {
    tableName: 'plan',
  }
);

export default Plan;
