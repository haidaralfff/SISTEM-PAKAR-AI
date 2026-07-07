import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  updateProfile as updateProfileApi,
  changePassword as changePasswordApi,
} from '../api'
import { useAuthStore } from '../../../store/authStore'

export function useLogin() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      setAuth(data.user, data.accessToken)
      navigate(data.user.role === 'admin' ? '/admin' : '/')
    },
  })
}

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      navigate('/login')
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      clearAuth()
      navigate('/login')
    },
  })
}

export function useUpdateProfile() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const user = useAuthStore((s) => s.user)
  const accessToken = useAuthStore((s) => s.accessToken)

  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: ({ data }) => {
      const updated = { ...user, ...data }
      setAuth(updated, accessToken)
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePasswordApi,
  })
}
