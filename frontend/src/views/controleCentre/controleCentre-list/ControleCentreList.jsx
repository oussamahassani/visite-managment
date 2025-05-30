import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import '../../../css/table2.css';
import Swal from 'sweetalert2';
import axiosInstance from 'axiosInstance';


const ControleCentreList = () => {
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
    try {

      let url = "/centres"

      const response = await axiosInstance.get(url);
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

  //Filter
  const handleFilter = (event) => {
    const filteredData = data.filter((row) =>
      (row.Telephone && row.Telephone.toLowerCase().includes(event.target.value.toLowerCase())) ||

      (row.FuelType && row.FuelType.toLowerCase().includes(event.target.value.toLowerCase())) ||
      (row.Availability && row.Availability.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setFilterRecords(filteredData);
    setCurrentPage(1);
  };

  const handleDelete = async (VehicleID) => {
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
          // await axios.delete(`${config.baseURL}/vehicles/${VehicleID}`);
          await axiosInstance.delete(`/getCentersById/${VehicleID}`);
          setData(data.filter((vehicle) => vehicle.VehicleID !== VehicleID));
          fetchData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
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
        <h3>Controle Centre List</h3>
        <div className="search-icon-data">
          <input type="text" placeholder="Search..." onChange={handleFilter} />
          <SearchOutlinedIcon />
        </div>
        <Link to='/admin/controlecenter/liste'>
          <button className="new-user-btn" >+ New Center</button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="responsive-table" style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>Telephone</th>
              <th> Name</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              currentRecords.length === 0 ? (
                <tr>
                  <td colSpan='4'>No vehicles available</td>
                </tr>
              ) : (
                currentRecords.map((vehicle, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{vehicle.Telephone}</td>
                    <td>{vehicle.Name}</td>


                    <td>
                      <button
                        className="action-button"
                        onClick={(event) => handleClick(event, vehicle.controleCenter)}>
                        Action
                      </button>
                      <Menu
                        id={`action-menu-${vehicle.controleCenter}`}
                        anchorEl={anchorEl}
                        open={menuId === vehicle.controleCenter}
                        onClose={handleClose}>
                        <Link to={`/admin/controlecenter/update/${vehicle.controleCenter}`}>
                          <MenuItem style={{ color: 'black' }}>Edit</MenuItem>
                        </Link>

                        <MenuItem onClick={() => handleDelete(vehicle.controleCenter)}>Delete</MenuItem>
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
    </div>
  );
};

export default ControleCentreList;
