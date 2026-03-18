import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from './index.vue'
import { useProductStore } from '../stores/product'

describe('pages/index.vue (Task 10.2 & 10.3)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('$fetch', vi.fn(() => Promise.resolve({ products: [], total: 0 })))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('displays loading skeleton while fetching data (Task 10.2)', async () => {
    const store = useProductStore()
    store.loading = true
    store.products = []
    store.itemsPerPage = 8

    const wrapper = await mountSuspended(IndexPage)
    
    expect(wrapper.html()).toContain('animate-pulse')
    expect(wrapper.html()).toContain('bg-white/60 backdrop-blur-sm')
  })

  it('displays a clear error message on API failure (Task 10.2)', async () => {
    const store = useProductStore()
    store.error = 'Internal Server Error 500'

    const wrapper = await mountSuspended(IndexPage)
    
    expect(wrapper.text()).toContain('Oops! Something went wrong')
    expect(wrapper.text()).toContain('Internal Server Error 500')
  })

  it('verifies clicking a product card passes correct route params (Task 10.3)', async () => {
    const store = useProductStore()
    store.products = [{ 
      id: 999, 
      title: 'Item 999', 
      price: 10, 
      image: '', 
      category: 'mock', 
      description: 'mock mock' 
    }]
    
    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    const link = wrapper.find('a[href="/products/999"]')
    expect(link.exists()).toBe(true)
  })
})
