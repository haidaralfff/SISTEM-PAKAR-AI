import { create } from 'zustand'
import { setAccessToken } from '../api/axios'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  accessToken: null,
  setAuth: (user, accessToken) => {
    localStorage.setItem('user', JSON.stringify(user))
    setAccessToken(accessToken)
    set({ user, accessToken })
  },
  clearAuth: () => {
    localStorage.removeItem('user')
    setAccessToken(null)
    set({ user: null, accessToken: null })
  },
}))
