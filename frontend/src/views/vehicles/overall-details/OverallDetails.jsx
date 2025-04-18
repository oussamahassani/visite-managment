import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from 'axios';
import '../../../css/table2.css';
import config from '../../../config';
import axiosInstance from 'axiosInstance';

const VehicleUsageStats = () => {
  const [data, setData] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/count/vehicle/all-data?timeFilter=all');
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

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = data.filter((row) => {
      return (
        (row.Vehicle && row.Vehicle.RegistrationNo.toLowerCase().includes(searchTerm)) ||
        (row.Vehicle && row.Vehicle.VehicleType.toLowerCase().includes(searchTerm))
      );
    });
    setFilterRecords(filteredData);
    setCurrentPage(1);
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
          title="Next Page">
          <ChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Vehicle</h3>
        <div className="search-icon-data">
          <input type="text" placeholder="Search..." onChange={handleFilter} />
          <SearchOutlinedIcon />
        </div>
        <Link to='/basic/add-order'>
          <button className="new-user-btn">+ New Order</button>
        </Link>
      </div>
      <div className="table-responsive">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>SR.NO.</th>
            <th>Vehicle Type</th>
            <th>Vehicle Name</th>
            <th>Vehicle NO</th>
            <th>Total Hours Used</th>
            <th>Total Trips</th>
            <th>Total Distance Covered</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length === 0 ? (
            <tr>
              <td colSpan='7'>No vehicle usage statistics available</td>
            </tr>
          ) : (
            currentRecords.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.Vehicle ? record.Vehicle.VehicleType : '-'}</td>
                <td>{record.Vehicle ? record.Vehicle.VehicleName : '-'}</td>
                <td>{record.Vehicle ? record.Vehicle.RegistrationNo : '-'}</td>
                <td>{record.totalHoursUsed || '-'}</td>
                <td>{record.totalTrips || '-'}</td>
                <td>{record.totalDistanceCovered || '-'}</td>
                <td>{record.totalRevenue || '-'}</td>
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
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
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

export default VehicleUsageStats;
