import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    accept: 'application/json',
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT"
  },
});

export default Api;