<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2">Our Products</h1>
        <p class="text-gray-600">Discover our amazing collection of items.</p>
      </div>
      
      <!-- Filters and Search -->
      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <input 
          v-model="productStore.searchQuery" 
          type="text" 
          placeholder="Search products..." 
          class="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full sm:w-64"
        >
        
        <select 
          v-model="productStore.selectedCategory" 
          class="px-4 py-2 border shadow-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full sm:w-48 capitalize bg-white text-gray-700"
        >
          <option value="">All Categories</option>
          <option v-for="category in productStore.categories" :key="category" :value="category">
            {{ category.replace('-', ' ') }}
          </option>
        </select>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="productStore.error" class="bg-red-50 p-6 rounded-xl border border-red-100 text-center mb-6">
      <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="text-lg font-medium text-red-800 mb-2">Oops! Something went wrong</h3>
      <p class="text-red-600">{{ productStore.error }}</p>
      <button @click="productStore.fetchProducts()" class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
        Try Again
      </button>
    </div>

    <!-- Container for dynamic opacity overlay -->
    <div class="relative">
      <!-- Loading Overlay when switching pages -->
      <div v-if="productStore.loading" class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
        <svg class="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Empty State -->
      <div v-if="!productStore.loading && productStore.filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No products found.</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[500px]">
        <!-- Show Skeleton block specifically when bootstrapping for UX -->
        <template v-if="productStore.loading && productStore.products.length === 0">
          <div v-for="i in productStore.itemsPerPage" :key="i" class="bg-gray-50 rounded-xl border border-gray-100 animate-pulse flex flex-col h-[360px]">
             <div class="h-48 bg-gray-200 w-full mb-4"></div>
             <div class="h-4 w-3/4 bg-gray-200 mx-5 mb-3"></div>
             <div class="h-4 w-1/2 bg-gray-200 mx-5"></div>
          </div>
        </template>
        <template v-else>
          <ProductCard 
            v-for="product in productStore.filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </template>
      </div>
      
      <!-- Pagination Controls (Task 8.2) -->
      <div class="flex items-center justify-between border-t border-gray-200 pt-6 mt-8" v-if="productStore.totalItems > 0">
        <button 
          @click="productStore.currentPage--" 
          :disabled="productStore.currentPage === 1 || productStore.loading"
          class="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          Previous
        </button>
        <div class="hidden sm:flex space-x-2">
          <span class="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg font-medium shadow-sm">
            Page {{ productStore.currentPage }} of {{ productStore.totalPages }}
          </span>
        </div>
        <button 
          @click="productStore.currentPage++" 
          :disabled="productStore.currentPage >= productStore.totalPages || productStore.loading"
          class="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next
          <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '#imports'
import { watch } from 'vue'
import { useAsyncData } from '#imports'

const productStore = useProductStore()

// Use useAsyncData to trigger the native fetch asynchronously. Wait safely during SSR to parse first payload
await useAsyncData('products-page', () => productStore.fetchProducts())

// Watch for manual pagination clicks and trigger refetch
watch(() => productStore.currentPage, () => {
  productStore.fetchProducts()
})
</script>
