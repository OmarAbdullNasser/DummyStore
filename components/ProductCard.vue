<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
    <!-- Image container -->
    <div class="relative pt-[100%] bg-gray-50 overflow-hidden">
      <img 
        :src="product.image || product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300'" 
        :alt="product.title"
        class="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    
    <!-- Content container -->
    <div class="p-5 flex flex-col flex-grow">
      <div class="flex-grow">
        <h3 class="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          {{ product.title }}
        </h3>
      </div>
      
      <!-- Price and action -->
      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">${{ product.price }}</span>
        
        <NuxtLink 
          :to="`/products/${product.id}`" 
          class="inline-flex items-center justify-center p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
          title="View Details"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// DummyJSON returns `thumbnail` and `images`, but the user `Product` type uses `image` usually, 
// so we accept any to handle both standard dummyjson output and custom types.
defineProps<{
  product: any
}>()
</script>
