import Head from 'next/head'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from '../contexts/AuthContext'

const breakpoints = {
  xsm: '200px',
  sm: '370px',
  md: '755px',
  lg: '960px',
  xl: '1050px',
  '2xl': '1536px',
}

const theme = extendTheme({ breakpoints })

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>

          <Component {...pageProps} />

      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
