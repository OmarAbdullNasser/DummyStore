import { defineStore, skipHydrate } from 'pinia'
import { ref } from 'vue'
import { useCookie, navigateTo } from '#imports'
import type { User, AuthResponse } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  
  // Initialize from cookie if it exists (for SSR compatibility)
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  })

  const login = async (credentials: any) => {
    try {
      const response = await $fetch<AuthResponse>('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials
      })

      // Store token in cookie
      token.value = response.accessToken || (response as any).token
      
      // Store user
      user.value = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        image: response.image
      }
      return true
    } catch (err: any) {
      console.error('Login failed', err)
      throw err
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await $fetch<any>('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We only pass back dummy data but we need to fulfill the assignment
        body: userData
      })

      // Dummyjson add user does not return a token.
      // The requirement: "storing the returned data (or a mock token) in the useCookie"
      token.value = 'mock-jwt-token-register'
      
      // Store user
      user.value = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        image: response.image
      }
      return true
    } catch (err: any) {
      console.error('Registration failed', err)
      throw err
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    navigateTo('/login')
  }

  const isAuthenticated = () => !!token.value

  return { user, token: skipHydrate(token), login, register, logout, isAuthenticated }
})
