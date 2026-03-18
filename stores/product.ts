import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Pagination State
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

  // Filtering & search state
  const searchQuery = ref('')
  const selectedCategory = ref('')

  // Task 8.3: Reset page to 1 on search or filter mutate
  watch([searchQuery, selectedCategory], () => {
    currentPage.value = 1
    // Auto-fetch could be put here, but component will handle it, or we do it here:
    fetchProducts()
  })

  // We'll also extract unique categories from products
  // Note: For full categories DummyJSON has a specific endpoint, but we keep this to prevent breaking the UI
  const categories = computed(() => {
    const allCats = products.value.map((p: any) => p.category).filter(Boolean)
    return [...new Set(allCats)] as string[]
  })

  // Since filtering is safely handled server-side now, we just pipe the products
  const filteredProducts = computed(() => products.value)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      // Task 8.1 Formula
      const skip = (currentPage.value - 1) * itemsPerPage.value
      
      let url = `https://dummyjson.com/products?limit=${itemsPerPage.value}&skip=${skip}`
      
      // Integrate with search and specific categories API endpoints natively
      if (searchQuery.value) {
        url = `https://dummyjson.com/products/search?q=${searchQuery.value}&limit=${itemsPerPage.value}&skip=${skip}`
      } else if (selectedCategory.value) {
        url = `https://dummyjson.com/products/category/${selectedCategory.value}?limit=${itemsPerPage.value}&skip=${skip}`
      }
      
      const response = await $fetch<{ products: any[], total: number }>(url)
      
      totalItems.value = response.total
      products.value = response.products.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.thumbnail, 
        category: p.category 
      }))
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return { 
    products, loading, error, fetchProducts,
    searchQuery, selectedCategory, filteredProducts, categories,
    currentPage, itemsPerPage, totalItems, totalPages
  }
})
