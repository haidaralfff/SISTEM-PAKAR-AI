import api from '../../api/axios'

export const submitConsultation = (data) => api.post('/consultations', data)
export const simulateConsultation = (data) => api.post('/consultations/simulate', data)
export const getHistory = (params) => api.get('/consultations/history', { params })
export const getConsultationDetail = (id) => api.get(`/consultations/${id}`)
export const deleteConsultation = (id) => api.delete(`/consultations/${id}`)
