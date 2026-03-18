import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'

// Mock NuxtLink since it's a global Nuxt component
const NuxtLinkStub = {
  name: 'NuxtLink',
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

describe('ProductCard.vue (Task 9.3)', () => {
  const mockProduct = {
    id: 123,
    title: 'Test Product',
    description: 'A mock product description',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
    category: 'mock-category'
  }

  it('renders product details correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('$99.99')
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://via.placeholder.com/300')
    expect(img.attributes('alt')).toBe('Test Product')
  })

  it('contains a link to the product details page', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub
        }
      }
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/products/123')
  })
})
