// Create a file called axios.js in your Vue project
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000, // Adjust timeout as needed
});

export default instance;