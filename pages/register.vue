<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
    
    <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
      {{ error }}
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-medium mb-1">First Name</label>
        <input 
          v-model="form.firstName" 
          type="text" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          :class="{ 'border-red-500': validationErrors.firstName }"
          placeholder="Emily"
          @input="validationErrors.firstName = ''"
        >
        <p v-if="validationErrors.firstName" class="mt-1 text-sm text-red-500">{{ validationErrors.firstName }}</p>
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          :class="{ 'border-red-500': validationErrors.email }"
          placeholder="emily@example.com"
          @input="validateEmail"
        >
        <p v-if="validationErrors.email" class="mt-1 text-sm text-red-500">{{ validationErrors.email }}</p>
        <p v-else class="mt-1 text-xs text-gray-500">Must be a valid email format.</p>
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1">Password</label>
        <input 
          v-model="form.password" 
          type="password" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          :class="{ 'border-red-500': validationErrors.password }"
          placeholder="••••••••"
          @input="validatePassword"
        >
        <p v-if="validationErrors.password" class="mt-1 text-sm text-red-500">{{ validationErrors.password }}</p>
        <p v-else class="mt-1 text-xs text-gray-500">Password must be at least 6 characters.</p>
      </div>
      
      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center top-2 relative mt-2"
      >
        <span v-if="isLoading" class="mr-2">
          <!-- SVG Spinner -->
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        <span v-if="isLoading">Loading...</span>
        <span v-else>Register</span>
      </button>
    </form>
    
    <div class="mt-6 text-center">
      <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition">
        Already have an account? Log in
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from '#imports'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  firstName: '',
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')

const validationErrors = reactive({
  firstName: '',
  email: '',
  password: ''
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    validationErrors.email = 'Email address is required.'
    return false
  } else if (!emailRegex.test(form.email)) {
    validationErrors.email = 'Please enter a valid email address.'
    return false
  } else {
    validationErrors.email = ''
    return true
  }
}

const validatePassword = () => {
  if (form.password.length > 0 && form.password.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters long.'
    return false
  } else if (!form.password) {
    validationErrors.password = 'Password is required.'
    return false
  } else {
    validationErrors.password = ''
    return true
  }
}

const validateForm = () => {
  // First name quick validation locally since not modifying its template helper right now
  let isFirstValid = true
  if (!form.firstName.trim()) {
    validationErrors.firstName = 'First name is required.'
    isFirstValid = false
  } else {
    validationErrors.firstName = ''
  }

  const isEmailValid = validateEmail()
  const isPassValid = validatePassword()

  return isFirstValid && isEmailValid && isPassValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true
  error.value = ''
  
  try {
    // Generate username from email locally since it's dummyjson 
    const generatedUsername = form.email.split('@')[0]
    
    await authStore.register({ 
      firstName: form.firstName,
      username: generatedUsername,
      email: form.email, 
      password: form.password 
    })
    
    router.replace('/')
  } catch (err: any) {
    // Show precise error message
    error.value = err.message || 'Registration failed.'
  } finally {
    isLoading.value = false
  }
}
</script>
