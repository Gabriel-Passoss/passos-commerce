import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'passos-commerce.token': token } = parseCookies()

const api = axios.create({
  baseURL: 'http://localhost:3333+'
})

const fakestore = axios.create({
  baseURL: 'https://fakestoreapi.com'
})

api.interceptors.request.use(config => {
  console.log(config)

  return config
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default fakestore