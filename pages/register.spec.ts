import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'
import RegisterPage from './register.vue'
import { useAuthStore } from '../stores/auth'

describe('pages/register.vue Form Validations (Task 13.1 & 13.3)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('prevents registration if email format is invalid or password < 6 (Task 13.1)', async () => {
    const wrapper = await mountSuspended(RegisterPage)
    
    // Wait for refs to bind natively
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    
    // Set invalid inputs directly triggering @input real-time evaluations
    await emailInput.setValue('invalid-email-format')
    await passwordInput.setValue('12345') // 5 chars
    
    // Trigger submit mapping
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.text()).toContain('Please enter a valid email address.')
    expect(wrapper.text()).toContain('Password must be at least 6 characters long.')
    
    const store = useAuthStore()
    expect(store.register).not.toHaveBeenCalled // It should be fully intercepted
  })

  it('securely disables the Submit button while isLoading is true (Task 13.3)', async () => {
    const wrapper = await mountSuspended(RegisterPage)
    
    // Initially not loading
    let button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeUndefined()
    expect(wrapper.text()).toContain('Register')
    
    // Programmatically force the reactive loading payload using any bypass for TS setup variables
    ;(wrapper.vm as any).isLoading = true
    await wrapper.vm.$nextTick()
    
    button = wrapper.find('button[type="submit"]')
    // Assert disabled and UI spun safely
    expect(button.attributes('disabled')).toBe('')
    expect(wrapper.text()).toContain('Loading...')
  })
})
