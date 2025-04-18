import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import '../../../css/table2.css';
import Swal from 'sweetalert2';
import UpdateExpense from '../update-expense/UpdateExpense';
import axiosInstance from 'axiosInstance';



const ExpenseList = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expenseIdToUpdate, setExpenseIdToUpdate] = useState(null); 
  const [filterRecords, setFilterRecords] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/expense');
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

  const handleUpdateUser = (ExpenseID) => {
    setExpenseIdToUpdate(ExpenseID);  
    setIsEditMode(true);  
    setShowModal(true);  
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setExpenseIdToUpdate(null);  
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
        (row.VehicleNo && row.VehicleNo.toString().toLowerCase().includes(searchTerm)) ||
        (row.ExpenseType && row.ExpenseType.toString().toLowerCase().includes(searchTerm)) ||
        (row.Amount && row.Amount.toString().toLowerCase().includes(searchTerm)) ||
        (row.Date && row.Date.toString().toLowerCase().includes(searchTerm)) 
      );
    });
    setFilterRecords(filteredData);
    setCurrentPage(1);
  };

  const handleDelete = async (ExpenseID) => {
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
          await axiosInstance.delete(`/expense/${ExpenseID}`);
          setData(data.filter((expense) => expense.ExpenseID !== ExpenseID));
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
        <h3>Expense</h3>
        <div className="search-icon-data">
          <input type="text" placeholder="Search..." onChange={handleFilter}/>
          <SearchOutlinedIcon />
        </div>
        <Link to='/basic/add-expense'>
          <button className="new-user-btn" >+ Expense</button>
        </Link>
      </div>
      <div className="table-responsive">
      <table className="responsive-table" style={{overflow:'auto'}}>
        <thead>
          <tr>
            <th>SR.NO</th>
            <th>Vehicle NO</th>
            <th>Expense Type</th>
            <th>Fuel Quantity</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            currentRecords.length === 0 ? (
              <tr>
                <td colSpan='4'>No expense available</td>
              </tr>
            ) : (
              currentRecords.map((expense, index) => {
                const formattedDate = new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }).format(new Date(expense.Date));
        
                return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{expense.VehicleNo}</td>
                  <td>{expense.ExpenseType}</td>
                  <td>{expense.FuelQuantity} liter</td>
                  <td>{expense.Amount}</td>
                  <td>{formattedDate}</td>
                   <td>
                    <button
                    className="action-button"
                    onClick={(event) => handleClick(event, expense.ExpenseID)}>
                    Action
                  </button>
                  <Menu
                    id={`action-menu-${expense.ExpenseID}`}
                    anchorEl={anchorEl}
                    open={menuId === expense.ExpenseID}
                    onClose={(event) => {
                      if (!showModal && !isEditMode) {
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
                    handleUpdateUser(expense.ExpenseID);
                    handleClose(); 
                    }}
                   style={{ color: 'black' }}>Edit</MenuItem>
                    <MenuItem 
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(expense.ExpenseID);
                      handleClose();
                      }}
                    >Delete</MenuItem>
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
            <option value={8}>8</option>
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
        <UpdateExpense
        ExpenseID={expenseIdToUpdate}  
        onClose={handleCloseModal}      
         />
     )}

    </div>
  );
};

export default ExpenseList;
