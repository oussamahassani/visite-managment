const Expense = require("../models/Expense");
const Order = require("../models/Visite");
const OrderPaymentsSummary = require("../models/OrderPaymentSummary");
const Vehicle = require("../models/vehicle");

Order.hasOne(OrderPaymentsSummary, { foreignKey: 'OrderID', as: 'PaymentSummary' });
OrderPaymentsSummary.belongsTo(Order, { foreignKey: 'OrderID', as: 'Order' });

Expense.belongsTo(Vehicle, { foreignKey: 'VehicleID', as: 'Vehicle' });
Vehicle.hasMany(Expense, { foreignKey: 'VehicleID', as: 'Expenses' });

