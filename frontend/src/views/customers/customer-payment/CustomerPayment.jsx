import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import '../../../css/payment.css'; // Import the CSS file
import { FaTimes } from 'react-icons/fa';
import axiosInstance from 'axiosInstance';

const CustomerPayment = ({ CustomerID, onClose }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/summary/customer/${CustomerID}`);
      const response = await axiosInstance.get(`/summary/customer/${CustomerID}`);
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) return <p className="loading">Loading payment details...</p>;
  const totalPaid = payments.reduce((sum, payment) => sum + payment.TotalPaid, 0);
  const totalRemaining = payments.reduce((sum, payment) => sum + payment.RemainingBalance, 0);

  return (
    <div className='modal-overlay'>
      <div className='payment-container'>
        <h2>Orders</h2>
        <hr></hr>
        <div className="close-icon" onClick={onClose}>
          <FaTimes />
        </div>
        <div className="table-responsive">
        {payments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Vehicle Name</th>
                <th>Vehicle NO</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Remaining Balance</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.PaymentID}>
                  <td>{payment.OrderNo}</td>
                  <td>{payment.VehicleName}</td>
                  <td>{payment.RegistrationNo}</td>
                  <td>{formatDate(payment.StartDate)} - {formatDate(payment.EndDate)}</td>
                  <td>{payment.TotalAmount}</td>
                  <td>{payment.TotalPaid}</td>
                  <td>{payment.RemainingBalance}</td>
                  <td>{formatDate(payment.updatedAt)}</td>
                  <td data-status={payment.Status}>{payment.Status}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className='tfoot'>
                  <tr>
                    <td colSpan="8" className="text-end"><strong>Total Paid Amount:</strong></td>
                    <td>{totalPaid}</td>
                  </tr>
                  <tr>
                    <td colSpan="8" className="text-end"><strong>Remaining Amount:</strong></td>
                    <td>{totalRemaining}</td>
                  </tr>
          </tfoot>
          </table>
        ) : (
          <p>No payment details found for this customer.</p>
        )}
           <tr></tr>
           </div>
      </div>
    </div>
  );
};

export default CustomerPayment;
