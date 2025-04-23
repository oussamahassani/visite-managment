const express = require('express');
const {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail
} = require('../controllers/customerController');

const router = express.Router();

router.post('/customers', addCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:CustomerID', getCustomerById);
router.get('/customers/byemail/:email', getCustomerByEmail);

router.put('/customers/:CustomerID', updateCustomer);
router.delete('/customers/:CustomerID', deleteCustomer);

module.exports = router;
