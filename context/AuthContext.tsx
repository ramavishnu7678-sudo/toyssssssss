'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (authToken: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
      } else {
        localStorage.removeItem('token')
        setToken(null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      // Check if response is ok before parsing JSON
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Login failed' }))
        toast.error(errorData.message || 'Login failed')
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await res.json()

      setToken(data.token)
      setUser(data)
      localStorage.setItem('token', data.token)
      toast.success('Login successful!')
      router.push('/')
    } catch (error: any) {
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        toast.error('Cannot connect to server. Please make sure the backend is running on port 5000.')
        console.error('Network error:', error)
      } else {
        toast.error(error.message || 'Login failed')
      }
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role?: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })

      // Check if response is ok before parsing JSON
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Registration failed' }))
        toast.error(errorData.message || 'Registration failed')
        throw new Error(errorData.message || 'Registration failed')
      }

      const data = await res.json()

      setToken(data.token)
      setUser(data)
      localStorage.setItem('token', data.token)
      toast.success('Registration successful!')
      router.push('/')
    } catch (error: any) {
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        toast.error('Cannot connect to server. Please make sure the backend is running on port 5000.')
        console.error('Network error:', error)
      } else {
        toast.error(error.message || 'Registration failed')
      }
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

