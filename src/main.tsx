import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from './components/layout'
import App from './App.tsx'

import './styles/root.css'
import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
