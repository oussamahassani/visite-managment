import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListGroup, Dropdown, Card } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

import ChatList from './ChatList';
import axiosInstance from 'axiosInstance';


const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const [pendingCustomers, setPendingCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingCustomers = async () => {
      try {
        const response = await axiosInstance.get('/notify/pending');
        setPendingCustomers(response.data.customers || []);
      } catch (error) {
        console.error('Error fetching pending customers:', error);
      }
    };

    fetchPendingCustomers();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
      localStorage.removeItem('authToken');
      localStorage.clear();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="feather icon-bell icon" />
              <span className="badge rounded-pill bg-danger">
                <span />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="notification notification-scroll">
              <div className="noti-head">
                <h6 className="d-inline-block m-b-0">Notifications</h6>
                <div className="float-end">
                  <Link to="#" style={{ textDecoration: 'none' }} className="m-r-10">
                    mark as read
                  </Link>
                </div>
              </div>
              <PerfectScrollbar>
                <ListGroup as="ul" bsPrefix=" " variant="flush" className="noti-body">
                  <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                    <p className="m-b-0">NEW</p>
                  </ListGroup.Item>
                  {pendingCustomers.length > 0 ? (
                    pendingCustomers.map((customer, index) => (
                      <ListGroup.Item key={index} as="li" bsPrefix=" " className="notification">
                        <Card
                          className="d-flex align-items-center shadow-none mb-0 p-0"
                          style={{ flexDirection: 'row', backgroundColor: 'unset' }}
                        >
                          <Card.Body className="p-0">
                            <p>
                              <strong>{customer.name}</strong>
                              <span className="n-time text-muted">
                                <i className="icon feather icon-clock me-2" />
                                {customer.status}
                              </span>
                            </p>
                            <p> DT {customer.remainingBalance}</p>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item as="li" bsPrefix=" " className="notification">
                      <p>No pending payments</p>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </PerfectScrollbar>
              <div className="noti-footer">
                <Link to="/admin/basic/orders-payment">show all</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end" className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <img src={avatar1} className="img-radius wid-40" alt="User Profile" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>Admin</span>
                <Link to="#" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item" onClick={handleLogout}>
                    <i className="feather icon-log-out" /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;

