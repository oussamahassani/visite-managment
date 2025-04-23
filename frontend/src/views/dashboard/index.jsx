import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import OrderCard from '../../components/Widgets/Statistic/OrderCard';

import customerChart from './chart/analytics-cuatomer-chart';
import customerChart1 from './chart/analytics-cuatomer-chart-1';
import getChartData from './chart/analytics-unique-visitor-chart';

import axiosInstance from 'axiosInstance';
import { CButton, CCard, CCardBody, CCardTitle, CCol, CDropdown, CDropdownMenu, CPagination, CDropdownToggle, CDropdownItem, CPaginationItem, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// ==============================|| DASHBOARD ANALYTICS ||============================== //

const DashAnalytics = () => {

  const [activeOrders, setActiveOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [availableVehicles, setAvailableVehicles] = useState(0);
  const [unavailableVehicles, setUnavailableVehicles] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalPendingPayments, setTotalPendingPayments] = useState(0);
  const [pendingPaymentsThisMonth, setPendingPaymentsThisMonth] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [customerData, setCustomerData] = useState({
    totalCustomers: 0,
    paid: 0,
    pending: 0,
  });
  const [timeFilter, setTimeFilter] = useState('all');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartConfig, setChartConfig] = useState(getChartData());

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination calculations
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const response = await axiosInstance.get('/count/orders');
        setActiveOrders(response.data.activeOrders);
        setCompletedOrders(response.data.completedOrders);
      } catch (error) {
        console.error('Error fetching order counts', error);
      }
    };

    fetchOrderCounts();
  }, []);

  useEffect(() => {
    const fetchVehicleCounts = async () => {
      try {
        const response = await axiosInstance.get('/count/vehicles');
        setAvailableVehicles(response.data.availableVehicles);
        setUnavailableVehicles(response.data.unavailableVehicles);
        setTotalVehicles(response.data.totalVehicles);
      } catch (error) {
        console.error('Error fetching vehicle counts', error);
      }
    };

    fetchVehicleCounts();
  }, []);

  useEffect(() => {
    const fetchPendingPayments = async () => {
      try {
        const response = await axiosInstance.get('/count/payments');
        setTotalPendingPayments(response.data.totalPendingPayments);
        setPendingPaymentsThisMonth(response.data.pendingPaymentsThisMonth);
      } catch (error) {
        console.error('Error fetching pending payments', error);
      }
    };

    fetchPendingPayments();
  }, []);

  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const response = await axiosInstance.get('/count/income');
        setTotalIncome(response.data.totalIncome);
        setTotalExpense(response.data.totalExpense);
      } catch (error) {
        console.error('Error fetching financial summary', error);
      }
    };

    fetchFinancialSummary();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axiosInstance.get('/count/customers');
        const { totalCustomers, statusCounts } = response.data;
        setCustomerData({
          totalCustomers,
          paid: statusCounts.Paid || 0,
          pending: statusCounts.Pending || 0,
        });
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  useEffect(() => {
    fetchVehicleStats();
  }, [timeFilter]);

  const fetchVehicleStats = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/count/vehicle/all-data?timeFilter=${timeFilter}`);
      console.log("API Response:", response.data);
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axiosInstance.get('/count/orders/summary');
        const data = response.data;

        const categories = data.map((item) => item.Month);
        const activeOrders = data.map((item) => item.ActiveOrders);
        const completedOrders = data.map((item) => item.CompletedOrders);
        setChartConfig(getChartData(categories, activeOrders, completedOrders));
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Active Orders',
              class: 'bg-c-blue',
              icon: 'feather icon-shopping-cart',
              primaryText: activeOrders.toString(),
              secondaryText: 'Completed Orders',
              extraText: completedOrders.toString()
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Total Vehicles',
              class: 'bg-c-green',
              icon: 'feather icon-tag',
              primaryText: totalVehicles.toString(),
              secondaryText: 'Available Vehicles',
              extraText: availableVehicles.toString(),
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Pending Payment',
              class: 'bg-c-yellow',
              icon: 'feather icon-repeat',
              primaryText: `${totalPendingPayments}`,
              secondaryText: 'This Month',
              extraText: `${pendingPaymentsThisMonth}`,
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Total Income',
              class: 'bg-c-red',
              icon: 'feather icon-award',
              primaryText: `${totalIncome}`,
              secondaryText: 'Total Expense',
              extraText: `${totalExpense}`
            }}
          />
        </Col>

        <Col md={12} xl={6}>
          <Card>
            <Card.Header>
              <h5>Orders</h5>
            </Card.Header>
            <Card.Body className="ps-4 pt-4 pb-0">
              <Chart {...chartConfig} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={6}>
          <Row>
            <Col sm={6}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Customers</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0">{customerData.totalCustomers}</h2>
                      <span className="text-c-green">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart(customerData.paid, customerData.pending)} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        {customerData.paid}
                      </h3>
                      <span className="ms-3">Paid</span>
                    </Col>
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle text-primary f-10 mx-2" />
                        {customerData.pending}
                      </h3>
                      <span className="ms-3">Pending</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className="bg-primary text-white">
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Vehicles</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0 text-white">{totalVehicles.toString()}</h2>
                      <span className="text-white">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart1(availableVehicles, unavailableVehicles)} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        {availableVehicles.toString()}
                      </h3>
                      <span className="ms-3">Available</span>
                    </Col>
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-white" />
                        {unavailableVehicles.toString()}
                      </h3>
                      <span className="ms-3">Unavailable</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col sm={12}>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CRow>
                <CCol>
                  <CCardTitle className="fs-4 fw-semibold">Daily Vehicles Stat</CCardTitle>
                </CCol>
                <CCol xs="auto" className="ms-auto">
                  <CDropdown>
                    <CDropdownToggle m='3' color="primary">{timeFilter === 'all' ? 'All Data' : timeFilter}</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => setTimeFilter('all')}>All Data</CDropdownItem>
                      <CDropdownItem onClick={() => setTimeFilter('today')}>Today</CDropdownItem>
                      <CDropdownItem onClick={() => setTimeFilter('month')}>This Month</CDropdownItem>
                      <CDropdownItem onClick={() => setTimeFilter('year')}>This Year</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <Link to='/admin/basic/add-order'>
                    <CButton color="secondary" className="ms-2">
                      addNewOrder
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
              <div>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <CTable align="middle" className="mb-0" hover responsive>
                      <CTableHead className="fw-semibold text-body-secondary">
                        <CTableRow>
                          <CTableHeaderCell>Vehicle Name</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Vehicle No</CTableHeaderCell>
                          <CTableHeaderCell>Total Hours Used</CTableHeaderCell>
                          <CTableHeaderCell>Total Trips</CTableHeaderCell>
                          <CTableHeaderCell>Total Distance Covered</CTableHeaderCell>
                          <CTableHeaderCell>Total Revenue</CTableHeaderCell>
                          <CTableHeaderCell>Expense Total</CTableHeaderCell>
                          <CTableHeaderCell>Expense Type</CTableHeaderCell>
                          <CTableHeaderCell>Fuel Quantity</CTableHeaderCell>
                          <CTableHeaderCell>Total Paid</CTableHeaderCell>
                          <CTableHeaderCell>Remaining Balance</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {currentRecords.length > 0 ? (
                          currentRecords.map((item, index) => (
                            <CTableRow key={index}>
                              <CTableDataCell>{item.Vehicle ? item.Vehicle.VehicleName : "-"}</CTableDataCell>
                              <CTableDataCell className="text-center">
                                {item.Vehicle ? item.Vehicle.RegistrationNo : "-"}
                              </CTableDataCell>
                              <CTableDataCell>{item.totalHoursUsed || "-"}</CTableDataCell>
                              <CTableDataCell>{item.totalTrips || "-"}</CTableDataCell>
                              <CTableDataCell>{item.totalDistanceCovered || "-"}</CTableDataCell>
                              <CTableDataCell>{item.totalRevenue}</CTableDataCell>
                              <CTableDataCell>{item.totalExpense || "-"}</CTableDataCell>
                              <CTableDataCell>
                                {item.expenseDetails && item.expenseDetails.length > 0 ? (
                                  item.expenseDetails.map((expense, expIndex) => (
                                    <span key={expIndex}>
                                      {expense.ExpenseType || 0}
                                      {expIndex !== item.expenseDetails.length - 1 ? ", " : ""}
                                    </span>
                                  ))
                                ) : (
                                  "-"
                                )}
                              </CTableDataCell>
                              <CTableDataCell>
                                {item.expenseDetails && item.expenseDetails.length > 0 ? (
                                  item.expenseDetails.map((expense, expIndex) => (
                                    <span key={expIndex}>
                                      {expense.fuelQuantity || 0} liter
                                      {expIndex !== item.expenseDetails.length - 1 ? ", " : ""}
                                    </span>
                                  ))
                                ) : (
                                  "-"
                                )}
                              </CTableDataCell>
                              <CTableDataCell>{item.totalPaid || 0}</CTableDataCell>
                              <CTableDataCell>{item.remainingBalance || 0}</CTableDataCell>
                            </CTableRow>
                          ))
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan="11" style={{ color: 'red', textAlign: 'center' }}>No data available</CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                    <div className="pagination-controls" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                      <div>
                        <label>Rows per page:</label>
                        <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                          {[5, 10, 15, 20, 25, 50, 100].map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                          <ChevronLeft />
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CCardBody>
          </CCard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashAnalytics;
