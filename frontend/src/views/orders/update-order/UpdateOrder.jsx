import React, { useState, useEffect } from 'react';
import '../../../css/order-form.css';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from 'axiosInstance';
const UpdateOrder = () => {
  const [inputData, setInputData] = useState({
    CustomerID: '',
    CustomerName: '',
    VehicleName: '',
    VehicleID: '',
    RegistrationNo: '',
    StartDate: '',
    EndDate: '',
    HoursUsed: '',
    HourlyRate: '',
    TotalTrip: '',
    TripRate: '',
    DistanceCovered: '',
    DistanceRate: '',
    TotalAmount: '',
    Status: '',
    Remarque: ''
  })

  const [customerList, setCustomerList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);
  const navigate = useNavigate();
  const { OrderID } = useParams();


  useEffect(() => {
    fetchCustomerName();
    fetchRegiNumber();
    fetchOrderData();
  }, [OrderID])


  const fetchOrderData = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/orders/${OrderID}`);
      const response = await axiosInstance.get(`/orders/${OrderID}`);
      console.log('Fetched data:', response.data);
      if (response.data) {
        setInputData(response.data);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const fetchCustomerName = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/customers`);
      const response = await axiosInstance.get('/customers');
      setCustomerList(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
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



  useEffect(() => {

  }, [inputData.HoursUsed, inputData.HourlyRate, inputData.TotalTrip, inputData.TripRate, inputData.DistanceCovered, inputData.DistanceRate, inputData.UsageType]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.put(`${config.baseURL}/orders/${OrderID}`, inputData);
      await axiosInstance.put(`/orders/${OrderID}`, inputData);
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
      navigate("/admin/basic/order-list");
    } catch (error) {
      console.error('Error adding order data:', error);
    }
  };
  const handleCancel = () => (navigate('/admin/basic/order-list'));
  return (
    <div>
      <div className="top-label">
        <h4>Update  visite</h4>
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
                    <option key={customer.CustomerId} value={customer.Name}>
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
                <input type="date" name="StartDate" value={inputData.StartDate} onChange={e => setInputData({ ...inputData, StartDate: e.target.value })} required />
              </div>

              <div className="input-box">
                <div className="details-container">
                  <span className="details">End Date</span>
                  <span className="required">*</span>
                </div>
                <input type="date" name="EndDate" value={inputData.EndDate} onChange={e => setInputData({ ...inputData, EndDate: e.target.value })} required />
              </div>





              <div className="input-box">
                <div className="details-container">
                  <span className="details">Total Amount</span>
                  <span className="required">*</span>
                </div>
                <input type="text" name="TotalAmount" value={inputData.TotalAmount} onChange={e => setInputData({ ...inputData, TotalAmount: e.target.value })} required />
              </div>

              <div className="input-box">
                <div className="details-container">
                  <span className="details">Status</span>
                  <span className="required">*</span>
                </div>
                <select name='Status' value={inputData.Status} onChange={e => setInputData({ ...inputData, Status: e.target.value })}>
                  <option value="" disabled>-Select-</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="input-box">
                <div className="details-container">
                  <span className="details">observation</span>
                  <span className="required">*</span>
                </div>
                <input type="text" name="Remarque"
                  value={inputData.Remarque}
                  onChange={e => setInputData({ ...inputData, Remarque: e.target.value })} />
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

export default UpdateOrder;
