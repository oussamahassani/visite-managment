



import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ConfigContext } from '../../contexts/ConfigContext';
import * as actionType from '../../store/actions';
import config from 'config';
import axiosInstance from 'axiosInstance';

const UserLayout = ({ children }) => {
  console.log("userLayout")
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const ref = useRef();
  const configContext = useContext(ConfigContext);
  const { collapseMenu, layout } = configContext.state;
  const { dispatch } = configContext;

  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }

    if (windowSize.width < 992) {
      dispatch({ type: actionType.CHANGE_LAYOUT, layout: 'vertical' });
    }
  }, [dispatch, layout, windowSize]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get('/protected-route', { withCredentials: true });
        if (response.data.valid) {
          setIsAuthenticated(true);
          setSessionExpired(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setSessionExpired(true);
          localStorage.removeItem("authToken");
          console.log('Session expired. Redirecting to login page.');
          navigate('/auth/login');
        }
      }
    };

    if (isAuthenticated) {
      checkSession();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setSessionExpired(true);
          localStorage.removeItem("authToken");
          console.log('Session expired. Redirecting to login page.');
          navigate('/auth/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  if (sessionExpired) {
    return <Navigate to="/auth/login" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  let mainClass = ['pcoded-wrapper'];
  let common = (
    <React.Fragment>
      <Navigation />
      <NavBar />
    </React.Fragment>
  );

  if (windowSize.width < 992) {
    let outSideClass = ['nav-outside'];
    if (collapseMenu) {
      outSideClass = [...outSideClass, 'mob-backdrop'];
    }
    outSideClass = [...outSideClass, 'mob-fixed'];

    common = (
      <div className={outSideClass.join(' ')} ref={ref}>
        {common}
      </div>
    );
  }

  return (
    <React.Fragment>
      {common}
      <div className="pcoded-main-container">
        <div className={mainClass.join(' ')}>
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <Breadcrumb />
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserLayout;
