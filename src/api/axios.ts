import axios from "axios"

const apiClient = axios.create({
  baseURL: "/api",
})

apiClient.interceptors.response.use((config) => {
  const token = localStorage.getItem("apiToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
