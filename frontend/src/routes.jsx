import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

// project import
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import ProtectedRoute from 'ProtectedRoute';

// ==============================|| ROUTES ||============================== //

const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

export const routes = [
  {
    exact: 'true',
    path: '/home',
    element: lazy(() => import('./views/home/Home'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    exact: 'true',
    path: '/auth/login',
    element: lazy(() => import('./views/auth/login/Login'))
  },

  {
    exact: 'true',
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    guard: ProtectedRoute,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/analytics',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        exact: 'true',
        path: '/basic/add-vehicle',
        element: lazy(() => import('./views/vehicles/add-vehicle/AddVehicle'))
      },
      {
        exact: 'true',
        path: '/basic/vehicles-list',
        element: lazy(() => import('./views/vehicles/vehicles-list/VehiclesList'))
      },
      {
         exact: 'true',
         path: '/vehicles/update-vehicle/:VehicleID',
         element: lazy(() => import('./views/vehicles/update-vehicle/UpdateVehicle'))
      },
      {
        exact: 'true',
        path: '/basic/overall-details',
        element:lazy(() => import('./views/vehicles/overall-details/OverallDetails'))
      },
      {
        exact: 'true',
        path: '/basic/add-customer',
        element: lazy(() => import('./views/customers/add-customer/AddCustomer'))
      },
      {
        exact: 'true',
        path: '/basic/customers-list',
        element: lazy(() => import('./views/customers/customers-list/CustomersList'))
      },
      {
        exact: 'true',
        path: '/customers/customer-payment/:CustomerID',
        element: lazy(() => import('./views/customers/customer-payment/CustomerPayment'))
      },
      {
        exact: 'true',
        path: '/basic/add-order',
        element: lazy(() => import('./views/orders/add-order/AddOrder'))
      },
      {
        exact: 'true',
        path: '/basic/order-list',
        element: lazy(() => import('./views/orders/order-list/OrderList'))
      },
      {
        exact: 'true',
        path: '/orders/update-order/:OrderID',
        element: lazy(() => import('./views/orders/update-order/UpdateOrder'))
      },
      {
        exact: 'true',
        path: '/basic/add-payment',
        element: lazy(() => import('./views/payment/add-payment/AddPayment'))
      },
      {
        exact: 'true',
        path: '/basic/payment-list',
        element: lazy(() => import('./views/payment/payment-list/PaymentList'))
      },
      {
        exact: 'true',
        path: '/basic/orders-payment',
        element: lazy(() => import('./views/payment/orders-payment/OrdersPayment'))
      },

      {
        exact: 'true',
        path: '/basic/add-expense',
        element: lazy(() => import('./views/expense/add-expense/AddExpense'))
      },
      {
        exact: 'true',
        path: '/basic/expense-list',
        element: lazy(() => import('./views/expense/expense-list/ExpenseList'))
      },
      {
        exact: 'true',
        path: '/booking/bookinglimit',
        element: lazy(() => import('./views/Booking/AddBookingLimit'))
      },
      {
        exact: 'true',
        path: '/booking/bookinglimit-list',
        element: lazy(() => import('./views/Booking/BookingLimitDashBoard'))
      },
      {
        exact: 'true',
        path: '/booking/booking-create',
        element: lazy(() => import('./views/Booking/CreateBooking'))
      },
      {
        exact: 'true',
        path: '/booking/booking-list',
        element: lazy(() => import('./views/Booking/BookingDashBoard'))
      },
       {
        path: '*',
        exact: 'true',
        element: () => {
          const isAuthenticated = !!localStorage.getItem("authToken");
          return <Navigate to={isAuthenticated ? '/app/dashboard/analytics' : '/home'} />;
        }
      }
    ]
  }
];

export default renderRoutes;
