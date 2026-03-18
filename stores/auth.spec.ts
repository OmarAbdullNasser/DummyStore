import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useAuthStore } from './auth'
import * as imports from '#imports'

// Mock entire nuxt imports needed for store
vi.mock('#imports', async (importOriginal) => {
  const actual = await importOriginal<typeof import('#imports')>()
  return {
    ...actual,
    useCookie: vi.fn(() => ({ value: null as any })),
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    navigateTo: vi.fn()
  }
})

describe('Auth Store (Task 9.1 & 13.1)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Stub global $fetch
    vi.stubGlobal('$fetch', vi.fn())
    vi.clearAllMocks()
    
    // Default useCookie mock for non-array tokens
    // @ts-ignore Bypass Nuxt stack depth limit
    ;(imports.useCookie as any).mockImplementation((key: string) => {
      if (key === 'registered_emails') return { value: [] as string[], push: function(v:any){this.value.push(v)} } as any
      return { value: null } as any
    })
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sets token and user state on successful login', async () => {
    const store = useAuthStore()
    
    const mockResponse = {
      accessToken: 'fake-jwt-token',
      id: 1,
      username: 'emilys',
      email: 'emily@example.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      image: 'emily.png'
    }
    
    vi.mocked($fetch).mockResolvedValueOnce(mockResponse)
    
    const result = await store.login({ username: 'emilys', password: 'password' })
    
    expect(result).toBe(true)
    expect(store.token).toBe('fake-jwt-token')
    expect(store.user?.username).toBe('emilys')
    expect($fetch).toHaveBeenCalledWith('https://dummyjson.com/auth/login', expect.any(Object))
  })

  it('registers user, updates state, and generates token', async () => {
    const store = useAuthStore()
    
    const mockResponse = {
      id: 2,
      username: 'newuser',
      email: 'newuser@example.com',
      firstName: 'New',
      lastName: 'User',
      image: 'new.png'
    }
    
    vi.mocked($fetch).mockResolvedValueOnce(mockResponse)
    
    const result = await store.register({
      firstName: 'New',
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123'
    })
    
    expect(result).toBe(true)
    expect(store.token).toBe('mock-jwt-token-register')
    expect(store.user?.email).toBe('newuser@example.com')
    expect($fetch).toHaveBeenCalledWith('https://dummyjson.com/users/add', expect.any(Object))
  })

  it('throws an error if email is duplicated in useCookie cache (Task 13.1)', async () => {
    const store = useAuthStore()
    
    // Explicitly mock a cookie array holding the duplicate
    // @ts-ignore Bypass Nuxt stack depth limit
    ;(imports.useCookie as any).mockImplementation((key: string) => {
      if (key === 'registered_emails') return { value: ['test@example.com'], push: vi.fn() } as any
      return { value: null } as any
    })
    
    await expect(store.register({
       firstName: 'Test',
       username: 'test',
       email: 'test@example.com',
       password: 'pass'
    })).rejects.toThrow('This email is already registered.')
  })

  it('clears token and user state on logout', () => {
    const store = useAuthStore()
    
    store.token = 'existing-token'
    store.user = { id: 1, username: 'test', email: 'test@example.com' }
    
    store.logout()
    
    expect(store.token).toBeNull()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated()).toBe(false)
  })
})
