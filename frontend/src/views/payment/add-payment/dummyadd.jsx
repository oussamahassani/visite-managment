import React, { useState, useEffect } from 'react';
import '../../../css/form.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMoneyBillAlt, FaCalendarAlt, FaBalanceScale, FaTimes, FaClipboardList } from 'react-icons/fa';
import config from '../../../config';

const AddPayment = () => {
  const [formData, setFormData] = useState({
    OrderID: '',
    CustomerID: '',
    CustomerName: '',
    TotalAmount: '',
    AmountPaid: '',
    PaymentMethod: '',
    PaymentDate: '',
    RemainingBalance: '',
    InitialRemainingBalance: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    fetchCustomerName();
  }, []);

  const fetchCustomerName = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/orders`);
      setCustomerList(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCustomerChange = async (e) => {
    const selectedName = e.target.value;
    setFormData({
      ...formData,
      CustomerName: selectedName,
      OrderID: '',
      CustomerID: '',
      TotalAmount: '',
      RemainingBalance: '',
      InitialRemainingBalance: '',
    });

    try {
      const response = await axios.get(`${config.baseURL}/orders/customer/${selectedName}`);
      const customerDetails = customerList.find((customer) => customer.CustomerName === selectedName);

      if (customerDetails) {
        setFormData((prevData) => ({
          ...prevData,
          CustomerID: customerDetails.CustomerID,
        }));
      }
      setOrdersList(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleOrderChange = async (e) => {
    const selectedOrderId = e.target.value;
    const selectedOrder = ordersList.find((order) => order.OrderID === selectedOrderId);

    if (selectedOrder) {
      try {
        const response = await axios.get(
          `${config.baseURL}/payments/latest/${selectedOrder.OrderID}`
        );

        const latestBalance = response.data.remainingBalance || selectedOrder.TotalAmount;

        setFormData({
          ...formData,
          OrderID: selectedOrderId,
          CustomerID: selectedOrder.CustomerID,
          TotalAmount: selectedOrder.TotalAmount,
          RemainingBalance: latestBalance,
          InitialRemainingBalance: latestBalance,
        });
      } catch (error) {
        console.error('Error fetching latest remaining balance:', error);
      }
    }
  };

  const handleAmountPaidChange = (e) => {
    const amountPaid = parseFloat(e.target.value) || 0;
    setFormData((prevData) => ({
      ...prevData,
      AmountPaid: amountPaid,
    }));
  };

  const calculateRemainingBalance = () => {
    const remainingBalance = parseFloat(formData.InitialRemainingBalance) - parseFloat(formData.AmountPaid);
    return remainingBalance >= 0 ? remainingBalance : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!formData.CustomerName) formErrors.CustomerName = 'Customer Name is required';
    if (!formData.OrderID) formErrors.OrderID = 'Order No is required';
    if (!formData.AmountPaid) formErrors.AmountPaid = 'Amount Paid is required';
    if (!formData.PaymentMethod) formErrors.PaymentMethod = 'Payment Method is required';
    if (!formData.PaymentDate) formErrors.PaymentDate = 'Payment Date is required';

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const remainingBalance = calculateRemainingBalance();
      const finalFormData = {
        ...formData,
        RemainingBalance: remainingBalance,
      };

      const response = await axios.post(`${config.baseURL}/payments`, finalFormData);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/admin/basic/payment-list');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="close-icon" onClick={() => navigate('/admin/basic/payment-list')}>
        <FaTimes />
      </div>
      <h3 className="form-title">Add Payment</h3>
      <form onSubmit={handleSubmit} className="form">
        {/* Customer Name */}
        <div className="profile-group">
          <label htmlFor="CustomerName">Customer Name</label>
          <div className="select-container input-container">
            <FaUser className="icon" />
            <select
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleCustomerChange}
              required
            >
              <option value="" disabled>Select Customer</option>
              {customerList.map((customer) => (
                <option key={customer.CustomerID} value={customer.CustomerName}>
                  {customer.CustomerName}
                </option>
              ))}
            </select>
          </div>
          {errors.CustomerName && <p className="error">{errors.CustomerName}</p>}
        </div>
        <div className="profile-group">
          <label htmlFor="OrderID">Order No</label>
          <div className="select-container input-container">
            <FaClipboardList className="icon" />
            <select
              name="OrderID"
              value={formData.OrderID}
              onChange={handleOrderChange}
              required
            >
              <option value="" disabled>Select Order</option>
              {ordersList.map((order) => (
                <option key={order.OrderID} value={order.OrderID}>
                  Order {order.OrderNo}
                </option>
              ))}

            </select>
          </div>
          {errors.OrderID && <p className="error">{errors.OrderID}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="TotalAmount">Total Amount</label>
          <div className="input-container">
            <FaMoneyBillAlt className="icon" />
            <input
              type="text"
              id="TotalAmount"
              name="TotalAmount"
              value={formData.TotalAmount}
              readOnly
            />
          </div>
        </div>

        {/* Amount Paid */}
        <div className="profile-group">
          <label htmlFor="AmountPaid">Amount Paid</label>
          <div className="input-container">
            <FaMoneyBillAlt className="icon" />
            <input
              type="number"
              id="AmountPaid"
              name="AmountPaid"
              value={formData.AmountPaid}
              onChange={handleAmountPaidChange}
              placeholder="Enter amount paid"
            />
          </div>
          {errors.AmountPaid && <p className="error">{errors.AmountPaid}</p>}
        </div>

        {/* Payment Date */}
        <div className="profile-group">
          <label htmlFor="PaymentDate">Payment Date</label>
          <div className="input-container">
            <FaCalendarAlt className="icon" />
            <input
              type="date"
              id="PaymentDate"
              name="PaymentDate"
              value={formData.PaymentDate}
              onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
            />
          </div>
          {errors.PaymentDate && <p className="error">{errors.PaymentDate}</p>}
        </div>

        {/* Remaining Balance */}
        <div className="profile-group">
          <label htmlFor="RemainingBalance">Remaining Balance</label>
          <div className="input-container">
            <FaBalanceScale className="icon" />
            <input
              type="text"
              id="RemainingBalance"
              name="RemainingBalance"
              value={calculateRemainingBalance()}
              readOnly
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddPayment;
