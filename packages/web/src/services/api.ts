import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

let cookies = parseCookies()

export const fakestore = axios.create({
  baseURL: 'https://fakestoreapi.com'
})

let isRefreshing = false
let failedRequestQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['passos-commerce.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies();

      const { 'passos-commerce.refreshToken': refreshToken } = cookies
      const originalConfig = error.config

      if (!isRefreshing) {
        isRefreshing = true

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data
  
          
        setCookie(undefined, 'passos-commerce.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })
        setCookie(undefined, 'passos-commerce.refreshToken', response.data.refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })
  
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        failedRequestQueue.forEach(request => request.onSuccess(token))
        failedRequestQueue = []
        }).catch(error => {
          failedRequestQueue.forEach(request => request.onFailure(error))
        }).finally(() => {
          isRefreshing = false
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          onFailure: (error) => {
            reject(error)
          }
        })
      })

    } else {
        signOut()
    }
  }

  return Promise.reject(error)
})