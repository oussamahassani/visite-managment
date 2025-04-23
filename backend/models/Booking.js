const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Counter = require('./counter'); // Import the counter model

const Booking = sequelize.define('bookings', {
  Booking_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Booking_Id: {
    type: DataTypes.STRING,
    unique: true
  },
  NameCenter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cusID: {
    type: DataTypes.STRING
  },
  Customer_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Vehicle_Type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Vehicle_Number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Contact_Number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  timestamps: false,
  tableName: 'bookings'
});

// Hook to generate unique Booking_Id
Booking.beforeCreate(async (booking, options) => {
  const counter = await Counter.findOne({ where: { id: 'bookingID' } });

  if (counter) {
    counter.seq += 1;
    await counter.save();
  } else {
    await Counter.create({ id: 'bookingID', seq: 1 });
  }

  const seqValue = counter ? counter.seq : 1;
  booking.Booking_Id = `BKG${seqValue}`;
});

module.exports = Booking;
