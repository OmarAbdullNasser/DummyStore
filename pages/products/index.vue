<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 class="text-3xl font-bold text-gray-800">Our Products</h1>
      
      <!-- Filters and Search -->
      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <input 
          v-model="productStore.searchQuery" 
          type="text" 
          placeholder="Search products..." 
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
        >
        
        <select 
          v-model="productStore.selectedCategory" 
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full sm:w-48 capitalize"
        >
          <option value="">All Categories</option>
          <option v-for="category in productStore.categories" :key="category" :value="category">
            {{ category.replace('-', ' ') }}
          </option>
        </select>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="productStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg flex justify-between items-center border border-red-200">
      <span>{{ productStore.error }}</span>
      <button @click="productStore.fetchProducts()" class="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition">
        Retry
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-else-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
        <div class="w-full h-48 bg-gray-200"></div>
        <div class="p-5 space-y-3">
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="productStore.filteredProducts.length === 0" class="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-100">
      <p class="text-xl">No products found matching your criteria.</p>
      <button @click="resetFilters" class="mt-4 text-indigo-600 font-medium hover:underline">Clear Filters</button>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in productStore.filteredProducts" 
        :key="product.id" 
        class="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col group"
      >
        <NuxtLink :to="`/products/${product.id}`" class="block flex-grow focus:outline-none flex flex-col">
          <div class="relative h-48 bg-gray-50 overflow-hidden">
            <!-- Using regular img tag for dummyjson thumbnails -->
            <img 
              :src="product.image" 
              :alt="product.title" 
              class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
            />
          </div>
          <div class="p-5 flex flex-col justify-between flex-grow border-t border-gray-50">
            <div>
              <p class="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1" v-if="(product as any).category">
                {{ (product as any).category.replace('-', ' ') }}
              </p>
              <h2 class="text-lg font-bold text-gray-900 leading-snug line-clamp-2" :title="product.title">
                {{ product.title }}
              </h2>
            </div>
            <p class="text-xl font-extrabold text-gray-900 mt-4">${{ product.price }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore, useAsyncData } from '#imports'

const productStore = useProductStore()

const resetFilters = () => {
  productStore.searchQuery = ''
  productStore.selectedCategory = ''
}

// Fetch products logic, running once
useAsyncData('products', async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
  return true
})
</script>
