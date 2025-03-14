import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.bitpin.ir',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance?.interceptors?.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
