import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import './styles/root.css'
import './styles/index.scss'
import { Nabvar } from './nabvar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Nabvar />
      <App />
    </BrowserRouter>
  </StrictMode>
)
