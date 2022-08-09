import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInfo, signInRequest } from '../services/auth'

type User = {
  name: string,
  avatar_url: string,
}

type SignInData = {
  name: string,
  email: string,
  password: string
}


type AuthContextType = {
  isAuthenticated: boolean,
  user: User,
  signIn: (data: SignInData) => Promise<void>

}
export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'passos-commerce.token': token } = parseCookies()

    if (token) {
      recoverUserInfo().then(response => setUser(response.user))
    }
  }, [])

  async function signIn({ name, email, password }: SignInData) {
    const { token, user } = await signInRequest({
      name,
      email,
      password
    })
    
    setCookie(undefined, 'passos-commerce.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setUser(user)
    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}