const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const Customer = require('./Customer');
const Vehicle = require('./vehicle');

const Order = sequelize.define('Visite', {
  OrderID: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  CustomerID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Customer,
      key: 'CustomerID',
    },
  },
  CustomerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  VehicleID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Vehicle,
      key: 'VehicleID',
    },
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  EndDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Remarque: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TotalAmount: {
    type: DataTypes.STRING,

  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OrderNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.belongsTo(Customer, { foreignKey: 'CustomerID', as: 'Customer' });
Order.belongsTo(Vehicle, { foreignKey: 'VehicleID', as: 'Vehicle' });

module.exports = Order;
