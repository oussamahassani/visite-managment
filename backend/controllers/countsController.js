const { Op,fn,col } = require('sequelize');
const Order = require("../models/Order");
const OrderPaymentsSummary = require("../models/OrderPaymentSummary");
const Vehicle = require("../models/vehicle");
const moment = require('moment');
const Expense = require('../models/Expense');
const Customer = require('../models/Customer');
const sequelize = require('../config/db');

exports.getOrderCounts = async (req, res) => {
    try {
      const activeOrdersCount = await Order.count({ where: { Status: 'Active' } });
      const completedOrdersCount = await Order.count({ where: { Status: 'Completed' } });
      
      res.status(200).json({
        activeOrders: activeOrdersCount,
        completedOrders: completedOrdersCount
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order counts' });
    }
  };
  

exports.getVehiclesCounts = async (req, res) => {
    try {
      const availableVehicleCount = await Vehicle.count({ where: { Availability: 'Available' } });
      const unavailableVehicleCount = await Vehicle.count({ where: { Availability: 'Unavailable' } });
      const totalVehicleCount = await Vehicle.count();
  
      res.status(200).json({
        availableVehicles: availableVehicleCount,
        unavailableVehicles: unavailableVehicleCount,
        totalVehicles: totalVehicleCount
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vehicle counts' });
    }
  };


exports.getPendingPayments = async (req, res) => {
  try {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

    const totalPendingPayments = await OrderPaymentsSummary.sum('RemainingBalance', {
      where: {
        Status: {
          [Op.in]: ['Pending', 'InProcess'],
        },
      },
    });
    const pendingPaymentsThisMonth = await OrderPaymentsSummary.sum('RemainingBalance', {
      where: {
        Status: {
          [Op.in]: ['Pending', 'InProcess'],
        },
        createdAt: {
          [Op.gte]: startOfMonth, 
          [Op.lte]: endOfMonth,  
        },
      },
      
    });

    res.status(200).json({
      totalPendingPayments: totalPendingPayments || 0,
      pendingPaymentsThisMonth: pendingPaymentsThisMonth || 0,
    });
  } catch (error) {
    console.error('Error calculating pending payments:', error);
    res.status(500).json({ error: 'Failed to calculate pending payments' });
  }
};
  

exports.getFinancialSummary = async (req, res) => {
    try {
      const totalIncome = await OrderPaymentsSummary.sum('TotalPaid');
      const totalExpense = await Expense.sum('Amount');
  
      res.status(200).json({
        totalIncome: totalIncome || 0, 
        totalExpense: totalExpense || 0,
      });
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      res.status(500).json({ error: 'Failed to fetch financial summary' });
    }
  };

exports.getVehicleUsageStats = async (req, res) => {
  try {
    const { timeFilter } = req.query; 
    
    let dateCondition = {}; 
   
    if (timeFilter === 'today') {
      dateCondition = {
        [Op.between]: [moment().startOf('day').toDate(), moment().endOf('day').toDate()]
      };
    } else if (timeFilter === 'month') {
      dateCondition = {
        [Op.between]: [moment().startOf('month').toDate(), moment().endOf('month').toDate()]
      };
    } else if (timeFilter === 'year') {
      dateCondition = {
        [Op.between]: [moment().startOf('year').toDate(), moment().endOf('year').toDate()]
      };
    }

    const vehicleStats = await Order.findAll({
      attributes: [
        'VehicleID',
        [fn('SUM', col('HoursUsed')), 'totalHoursUsed'],
        [fn('SUM', col('TotalTrip')), 'totalTrips'],
        [fn('SUM', col('DistanceCovered')), 'totalDistanceCovered'],
        [fn('SUM', col('TotalAmount')), 'totalRevenue'],
      ],
      where: timeFilter !== 'all' ? { createdAt: dateCondition } : {},
      group: ['VehicleID'],
      include: [
        {
          model: Vehicle,
          as: 'Vehicle',
          attributes: ['RegistrationNo', 'VehicleType', 'VehicleName'],
        },
      ],
    });
    const vehicleExpenses = await Expense.findAll({
      attributes: [
        'VehicleID',
        [fn('SUM', col('Amount')), 'totalExpense'],
      ],
      where: timeFilter !== 'all' ? { createdAt: dateCondition } : {},
      group: ['VehicleID'],
    });
    const groupedExpenses = await Expense.findAll({
      attributes: [
        'VehicleID',
        'ExpenseType',
        [fn('SUM', col('Amount')), 'totalAmount'],
        [fn('SUM', col('FuelQuantity')), 'fuelQuantity'],
      ],
      where: timeFilter !== 'all' ? { createdAt: dateCondition } : {},
      group: ['VehicleID', 'ExpenseType'],
    });

    const vehiclePayments = await OrderPaymentsSummary.findAll({
      attributes: [
        'RegistrationNo',
        [fn('SUM', col('TotalPaid')), 'totalPaid'],
        [fn('SUM', col('RemainingBalance')), 'remainingBalance'],
      ],
      where: timeFilter !== 'all' ? { createdAt: dateCondition } : {},
      group: ['RegistrationNo'],
    });

    const expenseMap = vehicleExpenses.reduce((acc, exp) => {
      acc[exp.VehicleID] = exp.get({ plain: true });
      return acc;
    }, {});

    const groupedExpenseMap = groupedExpenses.reduce((acc, exp) => {
      if (!acc[exp.VehicleID]) acc[exp.VehicleID] = [];
      acc[exp.VehicleID].push(exp.get({ plain: true }));
      return acc;
    }, {});

    const paymentMap = vehiclePayments.reduce((acc, pay) => {
      acc[pay.RegistrationNo] = pay.get({ plain: true });
      return acc;
    }, {});

    const finalData = vehicleStats.map((vehicle) => {
      const vehicleID = vehicle.VehicleID;
      const regNo = vehicle.Vehicle ? vehicle.Vehicle.RegistrationNo : null;
      return {
        ...vehicle.get({ plain: true }),
        totalExpense: expenseMap[vehicleID]?.totalExpense || 0,
        expenseDetails: groupedExpenseMap[vehicleID] || [],
        totalPaid: regNo && paymentMap[regNo] ? paymentMap[regNo].totalPaid : 0,
        remainingBalance: regNo && paymentMap[regNo] ? paymentMap[regNo].remainingBalance : 0,
      };
    });

    res.status(200).json(finalData);
  } catch (error) {
    console.error('Error fetching vehicle usage statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  exports.getCustomerCounts = async (req, res) => {
    try {
      const totalCustomers = await Customer.count();

      const statusCounts = await OrderPaymentsSummary.findAll({
        attributes: [
          'Status',
          [sequelize.fn('COUNT', sequelize.col('CustomerID')), 'count'],
        ],
        group: ['Status'],
      });
      const statusData = {};
      statusCounts.forEach((status) => {
        statusData[status.Status] = status.get('count');
      });
  
      res.status(200).json({
        totalCustomers,
        statusCounts: statusData,
      });
    } catch (error) {
      console.error('Error fetching customer counts:', error);
      res.status(500).json({ error: 'Failed to fetch customer counts' });
    }
  };

  exports.getOrdersSummary = async (req, res) => {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
      const ordersData = await Order.findAll({
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('StartDate'), '%Y-%m'), 'Month'],
          [sequelize.fn('COUNT', sequelize.col('OrderID')), 'TotalOrders'],
          [sequelize.literal(`SUM(CASE WHEN Status = 'Active' THEN 1 ELSE 0 END)`), 'ActiveOrders'],
          [sequelize.literal(`SUM(CASE WHEN Status = 'Completed' THEN 1 ELSE 0 END)`), 'CompletedOrders'],
        ],
        where: {
          StartDate: {
            [Op.gte]: sixMonthsAgo,
          },
        },
        group: [sequelize.fn('DATE_FORMAT', sequelize.col('StartDate'), '%Y-%m')],
        order: [[sequelize.fn('DATE_FORMAT', sequelize.col('StartDate'), '%Y-%m'), 'ASC']],
      });
  
      res.status(200).json(ordersData);
    } catch (error) {
      console.error('Error fetching orders summary:', error);
      res.status(500).json({ error: 'Failed to fetch orders summary' });
    }
};