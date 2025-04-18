const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Vehicle = require('./vehicle');
const {v4: uuidv4 } = require('uuid');

const Expense = sequelize.define('Expense',{
    ExpenseID:{
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    },
    VehicleID:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Vehicle,
            key:'VehicleID',
        },
    },
    VehicleNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ExpenseType: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    FuelQuantity:{
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Date: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});


module.exports = Expense;