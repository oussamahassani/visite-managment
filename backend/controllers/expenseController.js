
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { VehicleID, VehicleNo, ExpenseType, FuelQuantity, Amount, Date } = req.body;

  try {
    const expense = await Expense.create({ VehicleID, VehicleNo, ExpenseType, FuelQuantity, Amount, Date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense',error });
    console.error('expense added error ',error)
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findAll();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};

exports.getExpenseById = async (req, res) => {
  const { ExpenseID } = req.params;

  try {
    const expense = await Expense.findByPk(ExpenseID);
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};

exports.updateExpense = async (req, res) => {
  const { ExpenseID } = req.params;
  const { VehicleID,VehicleNo, ExpenseType,FuelQuantity, Amount, Date } = req.body;

  try {
    const expense = await Expense.findByPk(ExpenseID);
    if (expense) {
      await expense.update({ VehicleID, VehicleNo, ExpenseType,FuelQuantity, Amount, Date });
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: 'expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense',error });
  }
};

exports.deleteExpense = async (req, res) => {
  const { ExpenseID } = req.params;

  try {
    const expense = await Expense.findByPk(ExpenseID);
    if (expense) {
      await expense.destroy();
      res.status(200).json({ message: 'expense deleted successfully' });
    } else {
      res.status(404).json({ error: 'expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense', error });
  }
};
