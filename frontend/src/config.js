import axios from 'axios';

axios.defaults.withCredentials = true; 
const config = {
        // baseURL: 'https://transport.codiantsolutions.com/api'

      //  baseURL:'http://192.168.1.21:5000/api'
         baseURL:'http://localhost:5001/api'
  };

export default config;
  