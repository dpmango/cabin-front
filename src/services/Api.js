import axios from 'axios';

let BACKEND_URL = process.env.NODE_ENV === 'production' ? "https://cabin-backend.herokuapp.com" : "http://localhost:8000/"
// let BACKEND_URL = "https://api.cabin.com.sg"
// let BACKEND_URL = "http://localhost:8000/"
// let BACKEND_URL = "https://cabin-backend.herokuapp.com"

let ONBOARDING_URL = 'https://cabin-onboarding-api.herokuapp.com/api/';

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export const onboardingApi = axios.create({
  baseURL: ONBOARDING_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// export onboardingApi;
// export api;
