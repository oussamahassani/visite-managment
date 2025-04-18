// import axios from 'axios';
// import config from './config';

// const axiosInstance = axios.create({
//   baseURL: config.baseURL,
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   });
  
// export default axiosInstance;


import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error);


    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login'; 
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
