import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useProductStore } from './product'
import { nextTick } from 'vue'

describe('Product Store (Task 9.2 & 10.1)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('$fetch', vi.fn(() => Promise.resolve({ products: [], total: 0 })))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calculates skip based on currentPage and parses total items (Task 9.2 & 13.2)', async () => {
    const store = useProductStore()
    store.currentPage = 2
    store.itemsPerPage = 10
    
    // Update fetch mock to return a known payload total
    vi.mocked($fetch).mockResolvedValueOnce({ products: [], total: 100 })
    
    await store.fetchProducts()
    
    // skip should be (2-1)*10 = 10
    expect($fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=10&skip=10')
    expect(store.totalItems).toBe(100)
    expect(store.totalPages).toBe(10) // 100 / 10 = 10 pages mathematically calculated!
  })

  it('resets currentPage to 1 when searchQuery changes (Task 9.2 & 10.1)', async () => {
    const store = useProductStore()
    store.currentPage = 3
    
    store.searchQuery = 'phone'
    await nextTick() // wait for watcher
    
    expect(store.currentPage).toBe(1)
  })

  it('resets currentPage to 1 when selectedCategory changes (Task 9.2 & 10.1)', async () => {
    const store = useProductStore()
    store.currentPage = 4
    
    store.selectedCategory = 'beauty'
    await nextTick()
    
    expect(store.currentPage).toBe(1)
  })

  it('correctly translates searchQuery to the search API endpoint (Task 10.1)', async () => {
    const store = useProductStore()
    store.searchQuery = 'laptop'
    store.currentPage = 1
    
    await store.fetchProducts()
    expect($fetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?q=laptop&limit=10&skip=0')
  })

  it('correctly translates selectedCategory to the category API endpoint (Task 10.1)', async () => {
    const store = useProductStore()
    store.selectedCategory = 'groceries'
    store.currentPage = 1
    
    await store.fetchProducts()
    expect($fetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/groceries?limit=10&skip=0')
  })
})
