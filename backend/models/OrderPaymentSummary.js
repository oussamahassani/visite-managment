const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const OrderPaymentsSummary = sequelize.define('OrderPaymentsSummary', {
  OrderID: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,

  },
  CustomerID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  CustomerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OrderNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VehicleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RegistrationNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StartDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  EndDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  TotalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  TotalPaid: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  RemainingBalance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
});

module.exports = OrderPaymentsSummary;
