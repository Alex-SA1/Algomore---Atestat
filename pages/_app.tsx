import ProtectedRoute from '@/components/ProtectedRoute'
import { AuthContextProvider } from '../context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'

const noAuthRequired = ['/', '/login', '/signup']

function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter()


  return ( 

  <AuthContextProvider>
    {noAuthRequired.includes(router.pathname) ? (
      <Component {...pageProps} />
    ) : (
      <ProtectedRoute>
          <Component {...pageProps} />
      </ProtectedRoute>
    )}
  </AuthContextProvider>
  )
}
export default App
