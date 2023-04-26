import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    accept: 'application/json'
  },
});

export default Api;