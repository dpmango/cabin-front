import axios from 'axios';

let BACKEND_URL = process.env.NODE_ENV === 'production' ? "http://cabin-backend.herokuapp.com" : "http://localhost:8000/"

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;
