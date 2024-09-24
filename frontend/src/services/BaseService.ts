import axios from 'axios'

const BaseService = axios.create({
    timeout: 60000,
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
      },
})


export default BaseService
