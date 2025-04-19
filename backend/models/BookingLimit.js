const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your DB config

const BookingLimit = sequelize.define('bookinglimits', {
  Booking_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Booking_Limit: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false, // disable createdAt/updatedAt if not needed
  tableName: 'bookinglimits' // optional: explicitly set table name
});

module.exports = BookingLimit;
