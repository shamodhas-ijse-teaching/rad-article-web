import api from "./api"

export const getAllArticles = async (page: number, limit: number) => {
  const res = await api.get(`/articles?page=${page}&limit=${limit}`)
  return res.data
}

export const getAdminArticles = async (page: number, limit: number) => {
  const res = await api.get(`/articles/admin/all?page=${page}&limit=${limit}`)
  return res.data
}

export const getMyArticles = async () => {
  const res = await api.get(`/articles/my-articles`)
  return res.data
}

export const getArticleById = async (id: string) => {
  const res = await api.get(`/articles/${id}`)
  return res.data
}

export const createArticle = async (formData: FormData) => {
  const res = await api.post(`/articles`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return res.data
}

export const generateAIDescription = async (title: string, content: string) => {
  const res = await api.post(`/articles/generate-description`, {
    title,
    content
  })
  return res.data
}

export const toggleArticleVisibility = async (id: string) => {
  const res = await api.patch(`/articles/${id}/visibility`)
  return res.data
}

export const toggleArticleFavorite = async (id: string) => {
  const res = await api.patch(`/articles/${id}/favorite`)
  return res.data
}
