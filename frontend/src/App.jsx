import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// project-import
import { routes, renderRoutes } from './routes';

// ==============================|| APP ||============================== //

const App = () => {
  return <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>{routes ? renderRoutes(routes) : typeof Element === 'function' ? <Element /> : Element}</BrowserRouter>;


};

export default App;
