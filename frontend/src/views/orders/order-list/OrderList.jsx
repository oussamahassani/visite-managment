import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from 'axios';
import '../../../css/table2.css';
import config from '../../../config';
import Swal from 'sweetalert2';
import axiosInstance from 'axiosInstance';


const CustomersList = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [filterRecords, setFilterRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const response = await axiosInstance.get('/orders');
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
        (row.RegistrationNo && row.RegistrationNo.toString().toLowerCase().includes(searchTerm)) ||
        (row.HoursUsed && row.HoursUsed.toString().toLowerCase().includes(searchTerm)) ||
        (row.HourlyRate && row.HourlyRate.toString().toLowerCase().includes(searchTerm)) ||
        (row.TotalTrip && row.TotalTrip.toString().toLowerCase().includes(searchTerm)) ||
        (row.TripRate && row.TripRate.toString().toLowerCase().includes(searchTerm)) ||
        (row.DistanceCovered && row.DistanceCovered.toString().toLowerCase().includes(searchTerm)) ||
        (row.DistanceRate && row.DistanceRate.toString().toLowerCase().includes(searchTerm)) ||
        (row.TotalAmount && row.TotalAmount.toString().toLowerCase().includes(searchTerm)) ||
        (row.Status && row.Status.toString().toLowerCase().includes(searchTerm))
      );
    });
    setFilterRecords(filteredData);
    setCurrentPage(1);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
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
          // await axios.delete(`${config.baseURL}/orders/${OrderID}`);
          await axiosInstance.delete(`/orders/${OrderID}`);
          setData(data.filter((order) => order.OrderID !== OrderID));
          fetchData(); 
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
        <h3>Orders</h3>
        <div className="search-icon-data">
          <input type="text" placeholder="Search..." onChange={handleFilter}/>
          <SearchOutlinedIcon />
        </div>
        <Link to='/basic/add-order'>
          <button className="new-user-btn">+ New Order</button>
        </Link>
      </div>
      <div className="table-responsive">
<table className="responsive-table" style={{overflow:'auto'}}>
  <thead>
    <tr>
      <th>SR.NO.</th>
      <th>Customer Name</th>
      <th>Order No</th>
      <th>Vehicle Name</th>
      <th>Vehicle NO</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Total Used</th>
      <th>Rate</th>
      <th>Total Amount</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {currentRecords.length === 0 ? (
      <tr>
        <td colSpan='10'>No orders are available</td>
      </tr>
    ) : (
      currentRecords.map((order, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{order.CustomerName}</td>
          <td>Order&nbsp;{order.OrderNo}</td>
          <td>{order.VehicleName}</td>
          <td>{order.RegistrationNo}</td>
          <td>{formatDate(order.StartDate)}</td>
          <td>{formatDate(order.EndDate)}</td>
          <td>
            {order.UsageType === 'Hourly' ? `${order.HoursUsed} hours`:
             order.UsageType === 'Trip' ? `${order.TotalTrip}Trip` :
             order.UsageType === 'Distance' ? `${order.DistanceCovered}KM` : '-'}
          </td>
          <td>
            {order.UsageType === 'Hourly' ? `${order.HourlyRate} per hour` :
             order.UsageType === 'Trip' ? `${order.TripRate} per trip` :
             order.UsageType === 'Distance' ? `${order.DistanceRate} per KM` : '-'}
          </td>
          <td>{order.TotalAmount}</td>
          <td>
            <span className={`status-text ${order.Status}`}>{order.Status}</span>
          </td>
          <td>
            <button
              className="action-button"
              onClick={(event) => handleClick(event, order.OrderID)}>
              Action
            </button>
            <Menu
              id={`action-menu-${order.OrderID}`}
              anchorEl={anchorEl}
              open={menuId === order.OrderID}
              onClose={handleClose}>
              <Link to={`/orders/update-order/${order.OrderID}`}>
                <MenuItem style={{ color: 'black' }}>Edit</MenuItem>
              </Link>
              <MenuItem onClick={() => handleDelete(order.OrderID)}>Delete</MenuItem>
            </Menu>
          </td>
        </tr>
      ))
    )}
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
    </div>
  );
};

export default CustomersList;
