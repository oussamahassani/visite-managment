import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from 'axios';
import '../../../css/table2.css';
import config from '../../../config';
import Swal from 'sweetalert2';
import UpdateCustomer from '../update-customer/UpdateCustomer';
import CustomerPayment from '../customer-payment/CustomerPayment';
import axiosInstance from 'axiosInstance';


const CustomersList = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [customerIdToUpdate, setCustomerIdToUpdate] = useState(null);
  const [customerIdToView, setCustomerIdToView] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [filterRecords, setFilterRecords] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/customers`);
      const response = await axiosInstance.get('/customers');
      setData(response.data);
      setFilterRecords(response.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  const totalPages = Math.ceil(filterRecords.length / rowsPerPage);
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = filterRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleUpdateUser = (studentId) => {
    setCustomerIdToUpdate(studentId);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleViewPayment = (CustomerID) => {
    setCustomerIdToView(CustomerID);
    setShowPaymentModal(true);
  };

  const handleFilter = (event) => {
    const filteredData = data.filter((row) =>
      (row.Name && row.Name.toLowerCase().includes(event.target.value.toLowerCase())) ||
      (row.Email && row.Email.toLowerCase().includes(event.target.value.toLowerCase())) ||
      (row.Contact && row.Contact.toLowerCase().includes(event.target.value.toLowerCase())) ||
      (row.Address && row.Address.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setFilterRecords(filteredData);
    setCurrentPage(1);
  };



  const handleCloseModal = () => {
    setShowModal(false);
    setCustomerIdToUpdate(null);
    fetchData();
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };
  const handleDelete = async (CustomerID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#f1b255",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // await axios.delete(`${config.baseURL}/customers/${CustomerID}`);
          await axiosInstance.delete(`/customers/${CustomerID}`);
          setData(data.filter((customer) => customer.CustomerID !== CustomerID));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          fetchData();
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error"
          });
        }
      }
    });
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="page-icon"
          disabled={currentPage === 1}
          title="Previous Page">
          <ChevronLeft />
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="page-icon"
          disabled={currentPage === totalPages}
          title="Next Page"
        >
          <ChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Customers</h3>
        <div className="search-icon-data">
          <input type="text" placeholder="Search..." onChange={handleFilter} />
          <SearchOutlinedIcon />
        </div>
        <Link to='/admin/basic/add-customer'>
          <button className="new-user-btn" >+ New Customer</button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>SR.NO.</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              currentRecords.length === 0 ? (
                <tr>
                  <td colSpan='4'>No customers available</td>
                </tr>
              ) : (
                currentRecords.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.Name}</td>
                    <td>{customer.Email}</td>
                    <td>{customer.Contact}</td>
                    <td>{customer.Address}</td>
                    <td>
                      <button
                        className="action-button"
                        onClick={(event) => handleClick(event, customer.CustomerID)}>
                        Action
                      </button>
                      <Menu
                        id={`action-menu-${customer.CustomerID}`}
                        anchorEl={anchorEl}
                        open={menuId === customer.CustomerID}
                        onClose={(event) => {
                          if (!showModal && !showPaymentModal) {
                            handleClose();
                          }
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleUpdateUser(customer.CustomerID);
                            handleClose();
                          }}
                          style={{ color: 'black' }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleViewPayment(customer.CustomerID);
                            handleClose();
                          }}
                          style={{ color: 'black' }}
                        >
                          Payment
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(customer.CustomerID);
                            handleClose();
                          }}
                          style={{ color: 'black' }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
      <div className="pagination-options-container">
        <div className="rows-per-page">
          <label htmlFor="rows-per-page">Rows per page:</label>
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={15}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
        <div className="pagination-buttons">
          {renderPagination()}
        </div>
      </div>

      {showModal && isEditMode && (
        <UpdateCustomer
          CustomerID={customerIdToUpdate}
          onClose={handleCloseModal}
        />
      )}

      {showPaymentModal && (
        <CustomerPayment
          CustomerID={customerIdToView}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

    </div>
  );
};

export default CustomersList;
