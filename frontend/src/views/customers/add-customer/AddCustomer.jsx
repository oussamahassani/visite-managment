import React, { useState } from 'react';
import '../../../css/form.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import config from '../../../config';
import axiosInstance from 'axiosInstance';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Contact: '',
    Address: '',
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

    if (!formData.Name) formErrors.Name = 'Name is required';
    if (!formData.Email) formErrors.Email = 'Email is required';
    if (!formData.Contact) formErrors.Contact = 'Contact is required';
    if (!formData.Address) formErrors.Address = 'Address is required';

    if (!formData.Contact) {
      formErrors.Contact = 'Phone number is required.';
  } 
   else if (formData.Contact.length !== 10) {
    formErrors.Contact = 'Phone number must be exactly 10 digits.';
 }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      // const response = await axios.post(`${config.baseURL}/customers`, formData,{
      //   headers: {
      //     'Authorization': `Bearer ${token}` 
      //   }
      // }
      const response = await axiosInstance.post('/customers', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
       navigate('/basic/customers-list');
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
       <div className="close-icon" onClick={() => navigate('/basic/customers-list')}>
        <FaTimes />
      </div>
       <h3 className='form-title'>Add Customer</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="profile-group">
          <label htmlFor="Name">Name</label>
          <div className="input-container">
          <FaUser className="icon" />
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
          {errors.Name && <p className="error">{errors.Name}</p>}
        </div>

        <div className="profile-group">
          <label htmlFor="Email">Email</label>
          <div className="input-container">
          <FaEnvelope className="icon" />
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          {errors.Email && <p className="error">{errors.Email}</p>}
        </div>
         
        <div className="profile-group">
          <label htmlFor="Contact">Contact</label>
          <div className="input-container">
          <FaPhone className="icon" />
            <input
              type="number"
              id="Contact"
              name="Contact"
              value={formData.Contact}
              onChange={handleChange}
            />
          </div>
          {formData.Contact && formData.Contact.length !== 10 && (
                           <p className="error">Phone number must be exactly 10 digits.</p>
          )}
        </div>
        <div className="profile-group">
          <label htmlFor="Address">Address</label>
          <div className="input-container">
          <FaMapMarkerAlt className="icon" />
            <input
              type="text"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
            />
          </div>
          {errors.Address && <p className="error">{errors.Address}</p>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddCustomer;
