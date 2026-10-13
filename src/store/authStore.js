import { create } from 'zustand'
import { STORAGE_KEYS } from '../constants/appConstants'

const getInitialToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || null
  } catch {
    return null
  }
}

export const useAuthStore = create((set) => ({
  currentUser: null,
  authToken: getInitialToken(),
  isAuthLoading: false,

  setCurrentUser: (user) => set({ currentUser: user }),

  setAuthToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      }
    } catch {
      // Storage access error handling
    }
    set({ authToken: token })
  },

  setAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),

  clearAuth: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    } catch {
      // Storage access error handling
    }
    set({
      currentUser: null,
      authToken: null,
      isAuthLoading: false,
    })
  },
}))

export default useAuthStore
