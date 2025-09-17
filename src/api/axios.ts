import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('apiToken')
  if (token) {
    if (!config.params) {
      config.params = {}
    }
    config.params = {
      ...config.params,
      api_token: token,
    }
  } else {
    console.warn('No API token found in localStorage')
  }
  return config
})

export default apiClient
