import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8866/',
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

export default axios
