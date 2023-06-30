import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('_auth');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { axiosInstance };
