import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from 'axios';
import '../../../css/table2.css';
import config from '../../../config';
import Swal from 'sweetalert2';
import axiosInstance from 'axiosInstance';


const PaymentList = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vehicleIdToUpdate, setVehicleIdToUpdate] = useState(null); 
  const [filterRecords, setFilterRecords] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get(`${config.baseURL}/payments`);
      const response = await axiosInstance.get('/payments');
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
  const handleCloseModal = () => {
    setShowModal(false);
    setVehicleIdToUpdate(null);  
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

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = data.filter((row) => {
      return (
        (row.CustomerName && row.CustomerName.toString().toLowerCase().includes(searchTerm)) ||
        (row.OrderNo && row.OrderNo.toString().toLowerCase().includes(searchTerm)) ||
        (row.AmountPaid && row.AmountPaid.toString().toLowerCase().includes(searchTerm)) ||
        (row.PaymentMethod && row.PaymentMethod.toString().toLowerCase().includes(searchTerm)) ||
        (row.PaymentDate && row.PaymentDate.toString().toLowerCase().includes(searchTerm))
      );
    });
    setFilterRecords(filteredData);
    setCurrentPage(1);
  };

  const handleDelete = async (PaymentID) => {
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
          // await axios.delete(`${config.baseURL}/payments/${PaymentID}`);
          await axiosInstance.delete(`/payments/${PaymentID}`);
          setData(data.filter((payment) => payment.PaymentID !== PaymentID));
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
        <h3>Payments</h3>
        <div className="search-icon-data">
          <input type="text" placeholder="Search..." onChange={handleFilter}/>
          <SearchOutlinedIcon />
        </div>
        <Link to='/basic/add-payment'>
          <button className="new-user-btn" >+ New Payment</button>
        </Link>
      </div>
      <div className="table-responsive">
    <table className="responsive-table" >
  <thead>
    <tr>
      <th>SR.NO</th>
      <th>Name</th>
      <th>Order</th>
      <th>Amount Paid</th>
      <th>Payment Method</th>
      <th>Payment Date</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      currentRecords.length === 0 ? (
        <tr>
          <td colSpan="6">No Payment data available</td>
        </tr>
      ) : (
        currentRecords.map((payment, index) => {
          const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(new Date(payment.PaymentDate));

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{payment.CustomerName}</td>
              <td>Order&nbsp;{payment.OrderNo}</td>
              <td>{payment.AmountPaid}</td>
              <td>{payment.PaymentMethod}</td>
              <td>{formattedDate}</td>
             
              <td>
            <span className={`status-text ${payment.Status}`}>{payment.Status}</span>
          </td>
              <td>
                <button
                  className="action-button"
                  onClick={(event) => handleClick(event, payment.PaymentID)}>
                  Action
                </button>
                <Menu
                  id={`action-menu-${payment.PaymentID}`}
                  anchorEl={anchorEl}
                  open={menuId === payment.PaymentID}
                  onClose={handleClose}>
                  <MenuItem onClick={() => handleDelete(payment.PaymentID)}>Delete</MenuItem>
                </Menu>
              </td>
            </tr>
          );
        })
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
        <UpdateUser
        VehicleID={vehicleIdToUpdate}  
        onClose={handleCloseModal}      
         />
     )}

    </div>
  );
};

export default PaymentList;
