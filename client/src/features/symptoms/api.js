import api from '../../api/axios'

export const getSymptoms = (params) => api.get('/symptoms', { params })
