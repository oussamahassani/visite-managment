import React, { useState, useEffect } from 'react';
import '../../../css/order-form.css';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'axiosInstance';
const AddPayment = () => {
  const [formData, setFormData] = useState({
    OrderID: '',
    CustomerID:'',
    CustomerName: '',
    TotalAmount: '',
    AmountPaid: '',
    PaymentMethod: '',
    PaymentDate: '',
    RemainingBalance: '',
    InitialRemainingBalance: '',
  })

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [ordersList, setOrdersList] = useState([]); 

  useEffect(() => {
    fetchCustomerName();
    console.log("Updated Remaining Balance:", formData.RemainingBalance);
  }, [formData.RemainingBalance]);

  const fetchCustomerName = async () => {
    try {
        const response = await axiosInstance.get('/orders');
        const uniqueCustomers = new Map();
        response.data.forEach(order => {
            if (!uniqueCustomers.has(order.CustomerID)) {
                uniqueCustomers.set(order.CustomerID, {
                    CustomerID: order.CustomerID,
                    CustomerName: order.CustomerName
                });
            }
        });

        setCustomerList([...uniqueCustomers.values()]);
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};

const handleCustomerChange = async (e) => {
    const selectedName = e.target.value;
    setFormData({ ...formData, CustomerName: selectedName, OrderID: '',CustomerID:'', TotalAmount: '',RemainingBalance:'',InitialRemainingBalance:'' });
    try {

      const response = await axiosInstance.get(`/orders/customer/${selectedName}`);
      console.log("Fetched Orders:", response.data);
      const customerDetails = customerList.find((customer) => customer.CustomerName === selectedName);

      if (customerDetails) {
        console.log('Setting CustomerID:', customerDetails.CustomerID);
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
         try{
          // const response = await axios.get(
          //   `${config.baseURL}/payments/latest/${selectedOrder.OrderID}`
          // );
          const response = await axiosInstance.get(`/payments/latest/${selectedOrder.OrderID}`);
          const latestBalance = response.data.remainingBalance || selectedOrder.TotalAmount;
          console.log(latestBalance)

          setFormData({
            ...formData,
            OrderID: selectedOrderId,
            CustomerID:selectedOrder.CustomerID,
            TotalAmount: selectedOrder.TotalAmount,
            RemainingBalance: latestBalance,
            InitialRemainingBalance: latestBalance
          });
         } catch(error){
          console.error('Error fetching latest remaining balance:',error);
         }
    }
  };

  // const handleAmountPaidChange = (e) => {
  //   const amountPaid = parseFloat(e.target.value) || 0;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     AmountPaid: amountPaid,
  //   }));
  // };
  const handleAmountPaidChange = (e) => {
    const amountPaid = parseFloat(e.target.value) || 0;
    const remainingBalance = parseFloat(formData.InitialRemainingBalance) - amountPaid;
  
    setFormData((prevData) => ({
      ...prevData,
      AmountPaid: amountPaid,
      RemainingBalance: remainingBalance >= 0 ? remainingBalance : 0
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
    if (!formData.CustomerID) formErrors = 'Customer Id is required'
    if (!formData.AmountPaid) formErrors.AmountPaid = 'Amount Paid is required';
    if (!formData.PaymentMethod) formErrors.PaymentMethod = 'Payment Method is required';
    if (!formData.PaymentDate) formErrors.PaymentDate = 'Payment Date is required';
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const remainingBalance = calculateRemainingBalance();
      const finalFormData = { ...formData, RemainingBalance: remainingBalance };
      // const response = await axios.post(`${config.baseURL}/payments`, finalFormData);
      const response = await axiosInstance.post('/payments', finalFormData);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/basic/payment-list');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  const handleCancel=()=>{
      navigate('/basic/payment-list');
  }

  return (
     <div>
        <div className="top-label">
           <h4>Add New Payment</h4>
      </div>
      <div className='form-container'>
        <div className="page-header">
            <form onSubmit={handleSubmit}>
                <h2>Please Enter Valid data</h2>
                <hr></hr>
                <br></br>
                <div className="user-details">
                  <div className="input-box">
  <div className="details-container">
    <span className="details">Customer Name</span>
    <span className="required">*</span>
  </div>
  <select
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleCustomerChange}
              required
            >
    <option value="">Select Customer</option>
    {customerList.map((customer) => (
      <option key={customer.CustomerID} value={customer.CustomerName}>
        {customer.CustomerName}
      </option>
    ))}
  </select>
  {errors.CustomerName && <p className="error">{errors.CustomerName}</p>}
</div>

                  <div className="input-box">
                       <div className="details-container">
                         <span className="details">Order No</span>
                          <span className="required">*</span>
                          </div>
                          <select
     name="OrderId"
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
  {errors.OrderID && <p className="error">{errors.OrderID}</p>}     </div>

                    <div className="input-box">
                       <div className="details-container">
                         <span className="details">Total Amount</span>
                          <span className="required">*</span>
                          </div>
                          <input
                          type="text"
                          id="TotalAmount"
                          name="TotalAmount"
                          value={formData.TotalAmount}
                          readOnly
                       />
                    </div>

                    <div className="input-box">
                       <div className="details-container">
                         <span className="details">Amount Paid</span>
                          <span className="required">*</span>
                          </div>
                          <input
                           type="number"
                           id="AmountPaid"
                           name="AmountPaid"
                          value={formData.AmountPaid}
                         onChange={handleAmountPaidChange}
                        placeholder="Enter amount paid"
                       />
                       {errors.AmountPaid && <p className="error">{errors.AmountPaid}</p>}
                    </div>

                     <div className="input-box">
                        <div className="details-container">
                            <span className="details">Payment Method</span>
                            <span className="required">*</span>
                        </div>
                        <select id='PaymentMethod' name='PaymentMethod' value={formData.PaymentMethod} onChange={e => setFormData({...formData,PaymentMethod:e.target.value})}>
                       <option value=''>-Select-</option>
                       <option value="ACH">ACH</option>
                       <option value="Bill Me">Bill Me</option>
                       <option value="Cash">Cash</option>
                       <option value="Check">Check</option>
                       <option value="Credit Card">Credit Card</option>
                       <option value="Manual Credit Card">Manual Credit Card</option>
                       <option value="PayPal">PayPal</option>
                       <option value="Purchase Order">Purchase Order</option>
                       <option value="Wire">Wire</option>
              </select>
              {errors.PaymentMethod && <p className="error">{errors.PaymentMethod}</p>}
                      </div>

                      <div className="input-box">
                        <div className="details-container">
                            <span className="details">Payment Date</span>
                            <span className="required">*</span>
                        </div>
                        <input
                          type="date"
                          id="PaymentDate"
                          name="PaymentDate"
                          value={formData.PaymentDate}
                          onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
                        />
                         {errors.PaymentDate && <p className="error">{errors.PaymentDate}</p>}
                      </div>

                      <div className="input-box">
                        <div className="details-container">
                            <span className="details">Remaining Balance</span>
                            <span className="required">*</span>
                        </div>
                        <input
                          type="text"
                          id="RemainingBalance"
                          name="RemainingBalance"
                          // value={calculateRemainingBalance()}
                          value={formData.RemainingBalance}
                          readOnly
                        />
                      </div>
                   </div>
                 <hr></hr>
                <div className="button-row">
                    <button type="submit" className="simple-button primary-button" title="Save Data">Save</button>
                    <button type="button" className="simple-button secondary-button" title='Go InstallmentList' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        
        </div>
        </div>
        </div>
    );
};

export default AddPayment;
