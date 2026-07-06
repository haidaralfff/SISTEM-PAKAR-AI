import api from '../../api/axios'

export const login = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)
export const logout = () => api.post('/auth/logout')
export const getProfile = () => api.get('/auth/profile')
export const updateProfile = (data) => api.put('/auth/profile', data)
export const changePassword = (data) => api.put('/auth/change-password', data)
