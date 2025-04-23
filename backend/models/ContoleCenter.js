const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const ControleCenter = sequelize.define('controleCenter', {
  controleCenter: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  Telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Adresse: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },


});
module.exports = ControleCenter;
