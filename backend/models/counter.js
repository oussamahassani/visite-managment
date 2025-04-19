const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust path to your Sequelize instance

const Counter = sequelize.define('Counter', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  seq: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: false,
  tableName: 'counters'
});

module.exports = Counter;
