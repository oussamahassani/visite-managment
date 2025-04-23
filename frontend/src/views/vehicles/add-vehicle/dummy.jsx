import React, { useState } from 'react';
import '../../../css/form.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import { FaCar, FaIdCard, FaTachometerAlt, FaGasPump, FaToggleOn, FaTimes } from 'react-icons/fa';
import axiosInstance from 'axiosInstance';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    VehicleType: '',
    RegistrationNo: '',
    Capacity: '',
    FuelType: '',
    Availability: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!formData.VehicleType) formErrors.VehicleType = 'VehicleType is required';
    if (!formData.RegistrationNo) formErrors.RegistrationNo = 'RegistrationNo is required';
    if (!formData.Capacity) formErrors.Capacity = 'Capacity is required';
    if (!formData.FuelType) formErrors.FuelType = 'FuelType is required'
    if (!formData.Availability) formErrors.Availability = 'Availability is required';



    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // const response = await axios.post(`${config.baseURL}/vehicles`, formData);
      const response = await axiosInstance.post('/vehicles', formData);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/admin/basic/vehicles-list');
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
      <div className="close-icon" onClick={() => navigate('/admin/basic/vehicles-list')}>
        <FaTimes />
      </div>
      <h3 className='form-title'>Add Vehicle</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="profile-group">
          <label htmlFor="VehicleType">Vehicle Type</label>
          <div className="input-container">
            <FaCar className="icon" />
            <input
              type="text"
              id="VehicleType"
              name="VehicleType"
              value={formData.VehicleType}
              onChange={handleChange}
            />
          </div>
          {errors.VehicleType && <p className="error">{errors.VehicleType}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="RegistrationNo">Registration NO</label>
          <div className="input-container">
            <FaIdCard className="icon" />
            <input
              type="text"
              id="RegistrationNo"
              name="RegistrationNo"
              value={formData.RegistrationNo}
              onChange={handleChange}
              placeholder="Enter vehicle number"
            />
          </div>
          {errors.RegistrationNo && <p className="error">{errors.RegistrationNo}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="Capacity">Capacity</label>
          <div className="input-container">
            <FaTachometerAlt className="icon" />
            <input
              type="text"
              id="Capacity"
              name="Capacity"
              value={formData.Capacity}
              onChange={handleChange}
            />
          </div>
          {errors.Capacity && <p className="error">{errors.Capacity}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="Availability">Availability</label>
          <div className="select-container input-container">
            <FaToggleOn className="icon" />
            <select id='Availability' name='Availability' value={formData.Availability} onChange={handleChange} >
              <option value="" disabled>select availability</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          {errors.Availability && <p className="error">{errors.Availability}</p>}
        </div>
        <div className="profile-group">
          <label htmlFor="FuelType">Fuel Type</label>
          <div className="input-container">
            <FaGasPump className="icon" />
            <input
              type="text"
              id="FuelType"
              name="FuelType"
              value={formData.FuelType}
              onChange={handleChange}
              placeholder="e.g,Petrol,Disel"
            />
          </div>
          {errors.FuelType && <p className="error">{errors.FuelType}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddVehicle;
