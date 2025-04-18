import React, { useEffect, useState } from 'react';
import '../../../css/form.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import { FaCar,FaTimes, FaCalendarAlt, FaMoneyBill, FaMoneyBillWave  } from 'react-icons/fa';
import axiosInstance from 'axiosInstance';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    VehicleID: '',
    VehicleNo: '',
    ExpenseType:'',
    FuelQuantity:'',
    Amount: '',
    Date:'',
  });

  const [errors, setErrors] = useState({});
  const [vehiclesList, setVehiclesList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRegiNumber();
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const fetchRegiNumber = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/vehicles`);
      const response = await axiosInstance.get('/vehicles');
      setVehiclesList(response.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
  
    if (!formData.VehicleNo) formErrors.VehicleNo = 'Vehicle Number is required';
    if (!formData.ExpenseType) formErrors.ExpenseType = 'Expense type is required';
    if (!formData.FuelQuantity) formErrors.FuelQuantity = 'Fuel Quantity is required';
    if (!formData.Amount) formErrors.Amount = 'Amount is required';
    if (!formData.Date) formErrors.Date = 'Date is required'

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    try {
      // const response = await axios.post(`${config.baseURL}/expense`, formData);
      const response = await axiosInstance.post('/expense', formData);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
     navigate('/basic/expense-list');
    } catch (error) {
      console.error("Error details:", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };
  
  return (
    
    <div className="profile-container">
      <div className="close-icon" onClick={() => navigate('/basic/expense-list')}>
        <FaTimes />
      </div>
      <h3 className='form-title'>Add Expense</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="profile-group"> 
          <label htmlFor="RegistrationNo">Vehicle NO</label>
          <div className="select-container input-container">
          <FaCar className="icon" />
          <select
                 name="VehicleNo"
                 value={formData.VehicleNo}
    onChange={(e) => {
      const selectedNumber = e.target.value;
      const selectedRegiNO = vehiclesList.find((vehicle) => vehicle.RegistrationNo === selectedNumber);
      setFormData({
        ...formData,
        VehicleNo: selectedNumber,
        VehicleID: selectedRegiNO ? selectedRegiNO.VehicleID: '',
      });
    }}
    required
  >
    <option value="">Select Vehicle NO</option>
    {vehiclesList.map((vehicle) => (
      <option key={vehicle.vehicleId} value={vehicle.RegistrationNo}>
        {vehicle.RegistrationNo}
      </option>
    ))}
  </select>
          </div>
          {errors.VehicleNo && <p className="error">{errors.VehicleNo}</p>}
        </div>
         
        <div className="profile-group">
          <label htmlFor="Capacity">Expense Type</label>
          <div className="input-container">
          <FaMoneyBillWave className="icon" />
            <input
              type="text"
              id="ExpenseType"
              name="ExpenseType"
              value={formData.ExpenseType}
              onChange={handleChange}
              placeholder='Disel,Mainteinance,etc.'
            />
          </div>
          {errors.ExpenseType && <p className="error">{errors.ExpenseType}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="Capacity"> Fuel Quantity in Lires</label>
          <div className="input-container">
          <FaMoneyBillWave className="icon" />
            <input
              type="number"
              id="FuelQuantity"
              name="FuelQuantity"
              value={formData.FuelQuantity}
              onChange={handleChange}
              placeholder='1 liter,10 liter'
            />
          </div>
          {errors.FuelQuantity && <p className="error">{errors.FuelQuantity}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="Availability">Amount</label>
          <div className="select-container input-container">
          <FaMoneyBill className="icon" />
            <input
              type="text"
              id="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
            />
          </div>
          {errors.Amount && <p className="error">{errors.Amount}</p>}
        </div>
        <div className="profile-group">
          <label htmlFor="FuelType">Date</label>
          <div className="input-container">
          <FaCalendarAlt className="icon" />
            <input
              type="date"
              id="Date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              placeholder="e.g,Petrol,Disel"
            />
          </div>
          {errors.Date && <p className="error">{errors.Date}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddExpense;
