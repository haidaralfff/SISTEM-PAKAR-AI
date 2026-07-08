import api from '../../api/axios'

export const getArticles = (params) => api.get('/articles', { params })
export const getArticleById = (id) => api.get(`/articles/${id}`)
