import axios from 'axios'

const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || '/',
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

apiClient.interceptors.request.use((config) => {
  if (config.url && !config.url.endsWith('.json')) {
    const urlParts = config.url.split('?')
    const path = urlParts[0]
    const query = urlParts[1]

    if (query) {
      config.url = `${path}.json?${query}`
    } else {
      config.url = `${config.url}.json`
    }
  }
  return config
})

export default apiClient
