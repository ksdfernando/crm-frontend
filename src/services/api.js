// services/api.js
import axios from 'axios';

const api = axios.create({
 
  // baseURL: 'http://localhost:3001/api',
  baseURL: ' http://crm-alb-1927065580.ap-south-1.elb.amazonaws.com/api',
    withCredentials: true, 
});

export default api;
