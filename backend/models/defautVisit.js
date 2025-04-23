const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const DefautVisite = sequelize.define('defautVisite', {
  defautID: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  visiteID: {
    type: DataTypes.STRING,

  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gravite: {
    type: DataTypes.STRING,
    allowNull: false,
  },



});
module.exports = DefautVisite;
