import axios from 'axios';

const api = axios.create({
   baseURL: 'http://oser.app.br:21516',
   //baseURL: 'http://localhost:3333',
})

export default api;