<template>
  <div class="min-h-screen flex flex-col">
    <!-- Responsive Navbar -->
    <header class="bg-indigo-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold tracking-wider">
          MyStore
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="hidden md:flex space-x-6 items-center">
          <NuxtLink to="/" class="hover:text-indigo-200 transition">Home</NuxtLink>
          <template v-if="authStore.isAuthenticated()">
            <button @click="authStore.logout()" class="bg-red-500 px-5 py-2 rounded-lg font-medium hover:bg-red-400 transition">
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="bg-indigo-500 px-5 py-2 rounded-lg font-medium hover:bg-indigo-400 transition">
              Login
            </NuxtLink>
          </template>
        </nav>

        <!-- Mobile Menu Button (Placeholder) -->
        <button class="md:hidden text-white focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-4 md:py-8">
      <slot />
    </main>

    <!-- Placeholder Footer -->
    <footer class="bg-gray-900 text-gray-400 p-6 text-center mt-auto border-t border-gray-800">
      <div class="container mx-auto">
        <p>&copy; {{ new Date().getFullYear() }} MyStore Nuxt 3 Task. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports'

const authStore = useAuthStore()
</script>

<style scoped>
/* Scoped layout styles */
.router-link-active {
  font-weight: bold;
}
</style>
