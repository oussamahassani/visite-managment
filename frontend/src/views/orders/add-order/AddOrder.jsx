import React, { useState, useEffect } from 'react';
import '../../../css/order-form.css';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'axiosInstance';
const AddOrder = () => {
  const [inputData, setInputData] = useState({
    CustomerID:'',
    CustomerName:'',
    VehicleID:'',
    VehicleName:'',
    RegistrationNo:'',
    UsageType:'',
    StartDate:'',
    EndDate:'',
    HoursUsed:'',
    HourlyRate: '',
    TotalTrip:'',
    TripRate:'',
    DistanceCovered:'',
    DistanceRate: '', 
    TotalAmount:'',
    Status:'',
  })

  const [customerList, setCustomerList] = useState([]); 
  const [vehiclesList, setVehiclesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomerName();
    fetchVehicleName();
  }, [])
  
  const fetchCustomerName = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/customers`);
      const response = await axiosInstance.get('/customers');
      setCustomerList(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchVehicleName = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/vehicles`);
      const response = await axiosInstance.get('/vehicles/available');
      setVehiclesList(response.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    }
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    if (inputData.UsageType === 'Hourly' && inputData.HoursUsed && inputData.HourlyRate) {
      totalAmount = parseFloat(inputData.HoursUsed) * parseFloat(inputData.HourlyRate);
    } else if (inputData.UsageType === 'Trip' && inputData.TotalTrip && inputData.TripRate) {
      totalAmount = parseFloat(inputData.TotalTrip) * parseFloat(inputData.TripRate);
    } else if (inputData.UsageType === 'Distance' && inputData.DistanceCovered && inputData.DistanceRate) {
      totalAmount = parseFloat(inputData.DistanceCovered) * parseFloat(inputData.DistanceRate);
    }

    setInputData({ ...inputData, TotalAmount: totalAmount.toFixed(2) });
  };


  useEffect(() => {
    calculateTotalAmount();
  }, [inputData.HoursUsed, inputData.HourlyRate, inputData.TotalTrip, inputData.TripRate, inputData.DistanceCovered, inputData.DistanceRate, inputData.UsageType]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post(`${config.baseURL}/orders`, inputData);
      await axiosInstance.post('/orders', inputData);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "success",
        title: "Data Saved Successfully!"
      });
      navigate("/basic/order-list"); 
    } catch (error) {
      console.error('Error adding order data:', error);
    }
  };
  
  const handleVehicleChange = (e) => {
    const selectedVehicleName = e.target.value;
    const selectedVehicle = vehiclesList.find((vehicle) => vehicle.VehicleName === selectedVehicleName);
    if (selectedVehicle) {
      setInputData({
        ...inputData,
        VehicleName: selectedVehicleName,
        RegistrationNo: selectedVehicle.RegistrationNo,
        VehicleID: selectedVehicle.VehicleID,
        UsageType: selectedVehicle.UsageType,
        HoursUsed: selectedVehicle.UsageType === 'Hourly' ? inputData.HoursUsed : '',
        DistanceCovered: selectedVehicle.UsageType === 'Distance' ? inputData.DistanceCovered : '',
        TotalTrip: selectedVehicle.UsageType === 'Trip' ? inputData.TotalTrip : '',
      });
    }
  };

  const handleCancel = () => (navigate('/basic/order-list'));

  return (
     <div>
        <div className="top-label">
           <h4>Add New Order</h4>
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
    value={inputData.CustomerName}
    onChange={(e) => {
      const selectedName = e.target.value;
      const selectedCustomer = customerList.find((customer) => customer.Name === selectedName);
      setInputData({
        ...inputData,
        CustomerName: selectedName,
        CustomerID: selectedCustomer ? selectedCustomer.CustomerID : '',
      });
    }}
    required
  >
    <option value="">Select Customer</option>
    {customerList.map((customer) => (
      <option key={customer.CustomerID} value={customer.Name}>
        {customer.Name}
      </option>
    ))}
  </select>
</div>
<div className="input-box">
                       <div className="details-container">
                         <span className="details">Vehicle Name</span>
                          <span className="required">*</span>
                          </div>
                          <select
    name="VehicleName"
    value={inputData.VehicleName}
    onChange={handleVehicleChange}
    required
  >
    <option value="">Select Vehicle Name</option>
    {vehiclesList.map((vehicle) => (
      <option key={vehicle.vehicleId} value={vehicle.VehicleName}>
        {vehicle.VehicleName}
      </option>
    ))}
  </select>
                  </div>


                  <div className="input-box">
                       <div className="details-container">
                         <span className="details">Registration NO</span>
                          <span className="required">*</span>
                          </div>
                          <input type="text" name="RegistrationNo" value={inputData.RegistrationNo} readOnly />
                  </div>

                    <div className="input-box">
                       <div className="details-container">
                         <span className="details">Start Date</span>
                          <span className="required">*</span>
                          </div>
                          <input type="date" name="StartDate" onChange={e => setInputData({...inputData,StartDate:e.target.value})} required />
                    </div>

                    <div className="input-box">
                       <div className="details-container">
                         <span className="details">End Date</span>
                          <span className="required">*</span>
                          </div>
                          <input type="date" name="EndDate" onChange={e => setInputData({...inputData,EndDate:e.target.value})}required />
                    </div>
                   { inputData.UsageType === 'Hourly' && (
                    <>
                     <div className="input-box">
                        <div className="details-container">
                            <span className="details">Hours Used</span>
                            <span className="required">*</span>
                        </div>
                        <input type="text" name="HoursUsed" onChange={e => setInputData({...inputData,HoursUsed:e.target.value})}required />
                      </div>

                      <div className="input-box">
                        <div className="details-container">
                            <span className="details">Hourly Rate</span>
                            <span className="required">*</span>
                        </div>
                        <input type="text" name="HourlyRate" onChange={e => setInputData({...inputData,HourlyRate:e.target.value})}required />
                      </div>
                    </>
                   )}
                
                   { inputData.UsageType === 'Trip' && (
                    <>
                       <div className="input-box">
                        <div className="details-container">
                            <span className="details">Total Trip</span>
                            <span className="required">*</span>
                        </div>
                        <input type='text' name="TotalTrip" onChange={e => setInputData({...inputData,TotalTrip: e.target.value})} required />
                      </div>
                      
                      <div className="input-box">
                        <div className="details-container">
                            <span className="details">Trip Rate</span>
                            <span className="required">*</span>
                        </div>
                        <input type="text" name="TripRate" onChange={e => setInputData({...inputData,TripRate:e.target.value})}required />
                      </div>
                    </>
                   )}
                    
                    {inputData.UsageType === 'Distance' && (
                      <>
                        <div className="input-box">
                        <div className="details-container">
                            <span className="details">Distance Covered</span>
                            <span className="required">*</span>
                        </div>
                        <input type='text' name="DistanceCovered" onChange={e => setInputData({...inputData,DistanceCovered: e.target.value})} required />
                      </div>

                      <div className="input-box">
                        <div className="details-container">
                            <span className="details">Distance Rate</span>
                            <span className="required">*</span>
                        </div>
                        <input type='text' name="DistanceRate" onChange={e => setInputData({...inputData,DistanceRate: e.target.value})} required />
                      </div>
                      </>
                    )}
                       <div className="input-box">
                        <div className="details-container">
                            <span className="details">Total Amount</span>
                            <span className="required">*</span>
                        </div>
                        <input type="text" name="TotalAmount" 
                        value={inputData.TotalAmount}
                        onChange={e => setInputData({...inputData,TotalAmount:e.target.value})} readOnly required />
                      </div>

                      <div className="input-box">
                        <div className="details-container">
                            <span className="details">Status</span>
                            <span className="required">*</span>
                        </div>
                        <select name='Status' onChange={e => setInputData({...inputData,Status: e.target.value})}>
                          <option value="">-Select-</option>
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                        </select>
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

export default AddOrder;
