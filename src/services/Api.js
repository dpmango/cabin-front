import axios from 'axios';

// let BACKEND_URL = process.env.NODE_ENV === 'production' ? "https://cabin-backend.herokuapp.com" : "http://localhost:8000/"
// let BACKEND_URL = "https://api.cabin.com.sg"
// let BACKEND_URL = "http://localhost:8000/"
let BACKEND_URL = "https://cabin-backend.herokuapp.com"

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;
