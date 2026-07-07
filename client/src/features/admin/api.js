import api from '../../api/axios'

export const getAdminStats = () => api.get('/admin/statistics')

export const getAdminSymptoms = (params) => api.get('/symptoms', { params })
export const createSymptom = (data) => api.post('/symptoms', data)
export const updateSymptom = (id, data) => api.put(`/symptoms/${id}`, data)
export const deleteSymptom = (id) => api.delete(`/symptoms/${id}`)

export const getAdminDiseases = (params) => api.get('/diseases', { params })
export const createDisease = (data) => api.post('/diseases', data)
export const updateDisease = (id, data) => api.put(`/diseases/${id}`, data)
export const deleteDisease = (id) => api.delete(`/diseases/${id}`)

export const getAdminRules = (params) => api.get('/rules', { params })
export const createRule = (data) => api.post('/rules', data)
export const updateRule = (id, data) => api.put(`/rules/${id}`, data)
export const deleteRule = (id) => api.delete(`/rules/${id}`)

export const getAdminUsers = (params) => api.get('/admin/users', { params })
export const deleteUser = (id) => api.delete(`/admin/users/${id}`)
