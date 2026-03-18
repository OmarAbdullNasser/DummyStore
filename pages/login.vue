<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
    
    <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
      {{ error }}
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-medium mb-1">Username</label>
        <input 
          v-model="username" 
          type="text" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          :class="{ 'border-red-500': validationErrors.username }"
          placeholder="emilys"
          @input="validateUsername"
          required
        >
        <p v-if="validationErrors.username" class="mt-1 text-sm text-red-500">{{ validationErrors.username }}</p>
        <p v-else class="mt-1 text-xs text-gray-500">Enter your DummyJSON username.</p>
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-1">Password</label>
        <input 
          v-model="password" 
          type="password" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          :class="{ 'border-red-500': validationErrors.password }"
          placeholder="emilyspass"
          @input="validatePassword"
          required
        >
        <p v-if="validationErrors.password" class="mt-1 text-sm text-red-500">{{ validationErrors.password }}</p>
        <p v-else class="mt-1 text-xs text-gray-500">Password must be at least 6 characters.</p>
      </div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span v-if="loading" class="mr-2">
          <!-- Simple SVG Spinner -->
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        <span v-if="loading">Signing In...</span>
        <span v-else>Sign In</span>
      </button>
    </form>
    
    <div class="mt-6 text-center">
      <NuxtLink to="/register" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition">
        Don't have an account? Register
      </NuxtLink>
    </div>

    <div class="mt-6 text-sm text-center text-gray-500">
      <p>Test Credentials:</p>
      <p>Username: <code class="bg-gray-100 px-1 rounded text-red-500">emilys</code></p>
      <p>Password: <code class="bg-gray-100 px-1 rounded text-red-500">emilyspass</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '#imports'
import { useRouter } from '#imports'

const authStore = useAuthStore()
const router = useRouter()
// dummyjson.com uses username and password, not email
const username = ref('emilys')
const password = ref('emilyspass')
const loading = ref(false)
const error = ref('')

const validationErrors = reactive({
  username: '',
  password: ''
})

const validateUsername = () => {
  if (!username.value.trim()) {
    validationErrors.username = 'Username is required.'
    return false
  } else {
    validationErrors.username = ''
    return true
  }
}

const validatePassword = () => {
  if (password.value.length > 0 && password.value.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters long.'
    return false
  } else if (!password.value) {
    validationErrors.password = 'Password is required.'
    return false
  } else {
    validationErrors.password = ''
    return true
  }
}

const validateForm = () => {
  const isUserValid = validateUsername()
  const isPassValid = validatePassword()
  return isUserValid && isPassValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''
  
  try {
    await authStore.login({ username: username.value, password: password.value })
    await new Promise(resolve => setTimeout(resolve, 50)) // Allow cookie storage to complete
    router.replace('/')
  } catch (err: any) {
    // Show error message
    error.value = err.data?.message || err.message || 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>
