import React, { useState } from 'react';
import '../../../css/form.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import axiosInstance from 'axiosInstance';
import '../../../css/order-form.css'

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    VehicleType: '',
    VehicleName: '',
    RegistrationNo: '',
    Capacity: '',
    FuelType:'',
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
    if (!formData.VehicleName) formErrors.VehicleName = 'VehicleName is required';
    if (!formData.RegistrationNo) formErrors.RegistrationNo = 'RegistrationNo is required';
    if (!formData.Capacity) formErrors.Capacity = 'Capacity is required';
    if (!formData.FuelType) formErrors.FuelType = 'FuelType is required'
    if (!formData.Availability) formErrors.Availability = 'Availability is required';
    
    
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    try {
      const response = await axiosInstance.post('/vehicles',formData);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
     navigate('/basic/vehicles-list');
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
    
    <div>
    <div className="top-label">
       <h4>Add New Vehicle</h4>
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
                     <span className="details">Vehicle Type</span>
                      <span className="required">*</span>
                      </div>
                      <input
                  type="text"
                  id="VehicleType"
                  name="VehicleType"
                  value={formData.VehicleType}
                  onChange={handleChange}
               />
               {errors.VehicleType && <p className="error">{errors.VehicleType}</p>}
              </div>
              <div className="input-box">
                   <div className="details-container">
                     <span className="details">Vehicle Name</span>
                      <span className="required">*</span>
                   </div>
                  <input
                  type="text"
                  id="VehicleName"
                  name="VehicleName"
                  value={formData.VehicleName}
                  onChange={handleChange}
               />
               {errors.VehicleName && <p className="error">{errors.VehicleName}</p>}
              </div>
                <div className="input-box">
                   <div className="details-container">
                     <span className="details">Registration NO</span>
                      <span className="required">*</span>
                      </div>
                      <input
                       type="text"
                       id="RegistrationNo"
                       name="RegistrationNo"
                       value={formData.RegistrationNo}
                       onChange={handleChange}
                      placeholder="Enter vehicle number"
                       />
                    {errors.RegistrationNo && <p className="error">{errors.RegistrationNo}</p>}
                 </div>

          

                 <div className="input-box">
                    <div className="details-container">
                        <span className="details">Capacity</span>
                        <span className="required">*</span>
                    </div>
                    <input
                      type="text"
                      id="Capacity"
                      name="Capacity"
                      value={formData.Capacity}
                      onChange={handleChange}
                  />
                    {errors.Capacity && <p className="error">{errors.Capacity}</p>}
                  </div>

                  <div className="input-box">
                    <div className="details-container">
                        <span className="details">Availability</span>
                        <span className="required">*</span>
                    </div>
                    <select id='Availability' name='Availability' value={formData.Availability}  onChange={handleChange} >
              <option value="" disabled>select availability</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            {errors.Availability && <p className="error">{errors.Availability}</p>}
            </div>
            
                   <div className="input-box">
                    <div className="details-container">
                        <span className="details">Fuel Type</span>
                        <span className="required">*</span>
                    </div>
                    <input
                      type="text"
                      id="FuelType"
                      name="FuelType"
                      value={formData.FuelType}
                      onChange={handleChange}
                      placeholder="e.g,Petrol,Disel"
                   />
                   {errors.FuelType && <p className="error">{errors.FuelType}</p>}
                  </div>
               </div>
             <hr></hr>
            <div className="button-row">
                <button type="submit" className="simple-button primary-button" title="Save Data">Save</button>
                <button type="button" className="simple-button secondary-button" title='Go InstallmentList' onClick={() => navigate('/basic/vehicles-list')}>Cancel</button>
            </div>
        </form>
    
    </div>
    </div>
    </div>
  );
};

export default AddVehicle;
