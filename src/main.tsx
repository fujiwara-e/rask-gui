import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// 開発時に環境変数からAPIトークンをlocalStorageに設定
if (import.meta.env.DEV && import.meta.env.VITE_RASK_API_TOKEN) {
  localStorage.setItem('apiToken', import.meta.env.VITE_RASK_API_TOKEN)
  console.log(
    'API Token set from environment variable:',
    import.meta.env.VITE_RASK_API_TOKEN.substring(0, 10) + '...',
  )
} else if (import.meta.env.DEV) {
  console.warn('VITE_RASK_API_TOKEN not found in environment variables')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  </StrictMode>,
)
