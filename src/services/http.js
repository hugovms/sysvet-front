import Axios from 'axios'

const client = Axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 0,
  headers: {}
})

export default client
