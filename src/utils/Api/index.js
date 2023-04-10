import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    accept: 'application/json'
  },
});

export default Api;