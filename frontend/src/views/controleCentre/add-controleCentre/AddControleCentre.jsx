import React, { useState } from 'react';
import '../../../css/form.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import axiosInstance from 'axiosInstance';
import '../../../css/order-form.css'

const AddControleCentre = () => {
  const [formData, setFormData] = useState({
    Telephone: '',
    Name: '',
    Adresse: '',

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

    if (!formData.Telephone) formErrors.Telephone = 'Telephone is required';
    if (!formData.Name) formErrors.Name = 'Name is required';
    if (!formData.Adresse) formErrors.Adresse = 'Adresse is required';




    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/centres', formData);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/admin/controlecenter/liste');
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
        <h4>Add New Controle center</h4>
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
                  <span className="details">Telephone</span>
                  <span className="required">*</span>
                </div>
                <input
                  type="text"
                  id="Telephone"
                  name="Telephone"
                  value={formData.Telephone}
                  onChange={handleChange}
                />
                {errors.Telephone && <p className="error">{errors.Telephone}</p>}
              </div>
              <div className="input-box">
                <div className="details-container">
                  <span className="details"> Name</span>
                  <span className="required">*</span>
                </div>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                />
                {errors.Name && <p className="error">{errors.Name}</p>}
              </div>
              <div className="input-box">
                <div className="details-container">
                  <span className="details">Adresse</span>
                  <span className="required">*</span>
                </div>
                <input
                  type="text"
                  id="Adresse"
                  name="Adresse"
                  value={formData.Adresse}
                  onChange={handleChange}
                  placeholder="Enter vehicle number"
                />
                {errors.Adresse && <p className="error">{errors.Adresse}</p>}
              </div>
            </div>
            <hr></hr>
            <div className="button-row">
              <button type="submit" className="simple-button primary-button" title="Save Data">Save</button>
              <button type="button" className="simple-button secondary-button" title='Go InstallmentList' onClick={() => navigate('/admin/controlecenter/liste')}>Cancel</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddControleCentre;
