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


const OrdersPayment = () => {
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
      // const response = await axios.get(`${config.baseURL}/summary/orders`);
      const response = await axiosInstance.get('/summary/orders');
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
        (row.TotalAmount  && row.TotalAmount .toString().toLowerCase().includes(searchTerm)) ||
        (row.TotalPaid && row.TotalPaid.toString().toLowerCase().includes(searchTerm)) ||
        (row.RemainingBalance && row.RemainingBalance.toString().toLowerCase().includes(searchTerm)) ||
        (row.Status && row.Status.toString().toLowerCase().includes(searchTerm))
      );
    });
    setFilterRecords(filteredData);
    setCurrentPage(1);
  };

  const handleDelete = async (OrderID) => {
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
          // await axios.delete(`${config.baseURL}/summary/orders/${OrderID}`);
          await axiosInstance.delete(`/summary/orders/${OrderID}`);
          setData(data.filter((payment) => payment.OrderID !== OrderID));
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
    <table className="responsive-table" style={{ overflow: 'auto' }}>
  <thead>
    <tr>
      <th>SR.NO</th>
      <th>Name</th>
      <th>Order</th>
      <th>Vehicle Name</th>
      <th>Vehicle No</th>
      <th>Due Amount</th>
      <th>Total Paid</th>
      <th>Remaining Balance</th>
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
        currentRecords.map((payment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{payment.CustomerName}</td>
              <td>Order&nbsp;{payment.OrderNo}</td>
              <td>{payment.VehicleName}</td>
              <td>{payment.RegistrationNo}</td>
              <td>{payment.TotalAmount}</td>
              <td>{payment.TotalPaid}</td>
              <td>{payment.RemainingBalance}</td>
               <td>
            <span className={`status-text ${payment.Status}`}>{payment.Status}</span>
          </td>
              <td>
                <button
                  className="action-button"
                  onClick={(event) => handleClick(event, payment.OrderID)}>
                  Action
                </button>
                <Menu
                  id={`action-menu-${payment.OrderID}`}
                  anchorEl={anchorEl}
                  open={menuId === payment.OrderID}
                  onClose={handleClose}>
                  <MenuItem onClick={() => handleDelete(payment.OrderID)}>Delete</MenuItem>
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
        <UpdateUser
        VehicleID={vehicleIdToUpdate}  
        onClose={handleCloseModal}      
         />
     )}

    </div>
  );
};

export default OrdersPayment;
