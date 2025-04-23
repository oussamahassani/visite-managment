

// project import
/*
import Loader from './components/Loader/Loader';

import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

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
    path: '/',
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
    path: '/admin',
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
        element: lazy(() => import('./views/vehicles/overall-details/OverallDetails'))
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
        path: '/admin',
        exact: 'true',
        element: () => {
          const isAuthenticated = !!localStorage.getItem("authToken");
          return <Navigate to={isAuthenticated ? '/app/dashboard/analytics' : '/home'} />;
        }
      }
    ],
  },
  {
    path: '*',
    layout: UserLayout,
    guard: ProtectedRoute,
    routes: [
      {
        exact: 'true',
        path: '/user/voiture',
        element: lazy(() => import('./views/vehicles/vehicles-list/VehiclesList'))
      },
      {
        exact: 'true',
        path: '/user/add-vehicle',
        element: lazy(() => import('./views/vehicles/add-vehicle/AddVehicle'))
      },
      {
        exact: 'true',
        path: '/user/addBooking',
        element: lazy(() => import('./views/Booking/CreateBooking'))
      },
      {
        exact: 'true',
        path: '/user/bookingList',
        element: lazy(() => import('./views/Booking/BookingDashBoard'))
      },
    ]
  }

];

export default renderRoutes;
*/


import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import ProtectedRoute from './ProtectedRoute';
import { Outlet } from 'react-router-dom';

// Redirection wrapper pour `/admin`
const AdminRedirect = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return <Navigate to={isAuthenticated ? '/admin/app/dashboard/analytics' : '/auth/login'} />;
};

// Redirection wrapper pour `/user`
const UserRedirect = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return <Navigate to={isAuthenticated ? '/user/bookingList' : '/auth/login'} />;
};

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, index) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        // Si la route a des sous-routes
        if (route.routes) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Outlet />
                  </Layout>
                </Guard>
              }
            >
              {route.routes.map((childRoute, i) => (
                <Route
                  key={i}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          );
        }

        // Route simple sans sous-routes
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {Element}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);
// Composants lazy chargés
const Home = lazy(() => import('./views/home/Home'));
const Login = lazy(() => import('./views/auth/login/Login'));
const SignUp1 = lazy(() => import('./views/auth/signup/SignUp1'));
const ResetPassword1 = lazy(() => import('./views/auth/reset-password/ResetPassword1'));
const Dashboard = lazy(() => import('./views/dashboard'));
const SamplePage = lazy(() => import('./views/extra/SamplePage'));
const AddVehicle = lazy(() => import('./views/vehicles/add-vehicle/AddVehicle'));
const VehiclesList = lazy(() => import('./views/vehicles/vehicles-list/VehiclesList'));
const UpdateVehicle = lazy(() => import('./views/vehicles/update-vehicle/UpdateVehicle'));
const OverallDetails = lazy(() => import('./views/vehicles/overall-details/OverallDetails'));
const AddCustomer = lazy(() => import('./views/customers/add-customer/AddCustomer'));
const CustomersList = lazy(() => import('./views/customers/customers-list/CustomersList'));
const CustomerPayment = lazy(() => import('./views/customers/customer-payment/CustomerPayment'));
const AddOrder = lazy(() => import('./views/orders/add-order/AddOrder'));
const OrderList = lazy(() => import('./views/orders/order-list/OrderList'));
const UpdateOrder = lazy(() => import('./views/orders/update-order/UpdateOrder'));
const AddPayment = lazy(() => import('./views/payment/add-payment/AddPayment'));
const PaymentList = lazy(() => import('./views/payment/payment-list/PaymentList'));
const OrdersPayment = lazy(() => import('./views/payment/orders-payment/OrdersPayment'));
const AddExpense = lazy(() => import('./views/expense/add-expense/AddExpense'));
const ExpenseList = lazy(() => import('./views/expense/expense-list/ExpenseList'));
const AddBookingLimit = lazy(() => import('./views/Booking/AddBookingLimit'));
const BookingLimitDashBoard = lazy(() => import('./views/Booking/BookingLimitDashBoard'));
const CreateBooking = lazy(() => import('./views/Booking/CreateBooking'));
const BookingDashBoard = lazy(() => import('./views/Booking/BookingDashBoard'));


const AddControleCentre = lazy(() => import('./views/controleCentre/add-controleCentre/AddControleCentre'));
const ControleCentreList = lazy(() => import('./views/controleCentre/controleCentre-list/ControleCentreList'));
const UpdateControleCentrevehicle = lazy(() => import('./views/controleCentre/update-controleCentre/UpdateControleCentre'));

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/signup-1',
    element: <SignUp1 />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/reset-password-1',
    element: <ResetPassword1 />
  },
  {
    path: '/admin',
    layout: AdminLayout,
    guard: ProtectedRoute,
    routes: [
      {
        path: 'app/dashboard/analytics',
        element: <Dashboard />
      },
      {
        path: 'sample-page',
        element: <SamplePage />
      },
      {
        path: 'basic/add-vehicle',
        element: <AddVehicle />
      },
      {
        path: 'basic/vehicles-list',
        element: <VehiclesList />
      },
      {
        path: 'vehicles/update-vehicle/:VehicleID',
        element: <UpdateVehicle />
      },
      {
        path: 'basic/overall-details',
        element: <OverallDetails />
      },
      {
        path: 'basic/add-customer',
        element: <AddCustomer />
      },
      {
        path: 'basic/customers-list',
        element: <CustomersList />
      },
      {
        path: 'customers/customer-payment/:CustomerID',
        element: <CustomerPayment />
      },
      {
        path: 'basic/add-order',
        element: <AddOrder />
      },
      {
        path: 'basic/order-list',
        element: <OrderList />
      },
      {
        path: 'orders/update-order/:OrderID',
        element: <UpdateOrder />
      },
      {
        path: 'basic/add-payment',
        element: <AddPayment />
      },
      {
        path: 'basic/payment-list',
        element: <PaymentList />
      },
      {
        path: 'basic/orders-payment',
        element: <OrdersPayment />
      },
      {
        path: 'basic/add-expense',
        element: <AddExpense />
      },
      {
        path: 'basic/expense-list',
        element: <ExpenseList />
      },
      {
        path: 'booking/bookinglimit',
        element: <AddBookingLimit />
      },
      {
        path: 'booking/bookinglimit-list',
        element: <BookingLimitDashBoard />
      },
      {
        path: 'booking/booking-create',
        element: <CreateBooking />
      },
      {
        path: 'booking/booking-list',
        element: <BookingDashBoard />
      },

      {
        path: 'controlecenter/add',
        element: <AddControleCentre />
      },
      {
        path: 'controlecenter/liste',
        element: <ControleCentreList />
      },
      {
        path: 'controlecenter/update',
        element: <UpdateControleCentrevehicle />
      },
      {
        path: '',
        element: <AdminRedirect />
      }
    ]
  },
  {
    path: '/user',
    layout: UserLayout,
    guard: ProtectedRoute,
    routes: [
      {
        path: 'voiture',
        element: <VehiclesList />
      },
      {
        path: 'add-vehicle',
        element: <AddVehicle />
      },
      {
        path: 'addBooking',
        element: <CreateBooking />
      },
      {
        path: 'bookingList',
        element: <BookingDashBoard />
      },
      {
        path: '',
        element: <UserRedirect />
      }
    ]
  }
];

export default renderRoutes;
