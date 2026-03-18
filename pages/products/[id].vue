<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <!-- Navigation -->
    <NuxtLink 
      to="/" 
      class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium group transition"
    >
      <svg class="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Products
    </NuxtLink>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-200 text-center shadow-sm">
      <svg class="w-12 h-12 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2">Error Loading Product</h2>
      <p class="text-red-500">{{ error.message || 'Product could not be found or API is down.' }}</p>
      <button @click="() => refresh()" class="mt-6 bg-red-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-red-200 hover:bg-red-700 transition transform hover:-translate-y-0.5">
        Try Again
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-else-if="pending" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div class="flex flex-col md:flex-row">
        <!-- Image Skeleton -->
        <div class="w-full md:w-1/2 h-96 bg-gray-200"></div>
        <!-- Details Skeleton -->
        <div class="p-8 md:p-12 w-full md:w-1/2 space-y-4">
          <div class="h-6 bg-gray-300 rounded-full w-1/4 mb-6"></div>
          <div class="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div class="h-12 bg-gray-300 rounded w-1/3 mt-10"></div>
          <div class="h-14 bg-gray-300 rounded-xl w-full mt-8"></div>
        </div>
      </div>
    </div>

    <!-- Product Details Layout -->
    <div v-else-if="product" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- Image Section -->
        <div class="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100 relative group">
          <div class="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <img 
            :src="product.images && product.images.length > 0 ? product.images[0] : product.thumbnail" 
            :alt="product.title" 
            class="relative z-10 max-w-full w-full h-auto object-contain max-h-[500px] transform group-hover:scale-105 transition duration-500 mix-blend-multiply drop-shadow-xl"
          />
        </div>
        
        <!-- Details Section -->
        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div>
            <div class="flex justify-between items-start mb-4">
              <span class="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full" v-if="product.category">
                {{ product.category.replace('-', ' ') }}
              </span>
              <span class="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm" v-if="product.rating">
                <svg class="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ product.rating }}
              </span>
            </div>
            
            <h1 class="text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
              {{ product.title }}
            </h1>
            
            <p class="text-gray-600 leading-relaxed text-lg mb-6">
              {{ product.description }}
            </p>
            
            <!-- Secondary Details -->
            <ul class="space-y-2 text-sm text-gray-500 mb-8 border-t border-gray-100 pt-6">
              <li class="flex items-center" v-if="product.brand">
                <svg class="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <strong class="text-gray-900 font-medium mr-2">Brand:</strong> {{ product.brand }}
              </li>
              <li class="flex items-center" v-if="product.stock !== undefined">
                <svg class="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                <strong class="text-gray-900 font-medium mr-2">Availability:</strong> 
                <span :class="product.stock > 10 ? 'text-green-600 font-semibold' : 'text-orange-500 font-semibold'">
                  {{ product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock' }}
                </span>
              </li>
              <li class="flex items-center" v-if="product.sku">
                <svg class="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                <strong class="text-gray-900 font-medium mr-2">SKU:</strong> {{ product.sku }}
              </li>
            </ul>
          </div>
          
          <div class="mt-auto border-t border-gray-100 pt-8">
            <div class="flex items-end space-x-4 mb-6">
              <span class="text-5xl font-black text-gray-900 tracking-tight">${{ product.price }}</span>
              <span v-if="product.discountPercentage" class="text-xl text-gray-400 line-through mb-1.5 font-medium">
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
              <span v-if="product.discountPercentage" class="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-2 ml-1">
                {{ product.discountPercentage }}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData } from '#imports'

const route = useRoute()
const productId = route.params.id

// Server-side fetching built directly into Nuxt with useAsyncData
const { data: product, pending, error, refresh } = await useAsyncData(
  `product-${productId}`, 
  () => $fetch<any>(`https://dummyjson.com/products/${productId}`)
)

// Dynamic SEO tags could optionally be appended here for product titles...
</script>
