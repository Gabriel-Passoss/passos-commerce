import { createContext, useState, ReactNode, useEffect } from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from '../services/AuthClient'

type User = {
  name: string,
  email: string,
  permissions: string[],
  roles: string[]
}

type SignInCredentials = {
  email: string,
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

export function signOut() {
  destroyCookie(undefined, 'passos-commerce.token')
  destroyCookie(undefined, 'passos-commerce.refreshToken')

  Router.push('/login')
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'passos-commerce.token': token } = parseCookies()

    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles, name } = response.data

        setUser({ email, permissions, roles, name })
      }).catch(() => {
       signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles, name } = response.data

      setCookie(undefined, 'passos-commerce.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'passos-commerce.refreshToken', refreshToken)

      setUser({
        email,
        permissions,
        roles,
        name
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}