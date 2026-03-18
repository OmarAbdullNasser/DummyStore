import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  // Read token directly from cookie as the primary source of truth
  const token = useCookie('auth_token')
  
  // Allow accessing the login and register pages natively
  if (to.path === '/login' || to.path === '/register') {
    // If they are already authenticated, redirect to home
    if (token.value) {
      return navigateTo('/')
    }
    return
  }
  
  // Protect all other routes
  if (!token.value) {
    return navigateTo('/login')
  }
})
