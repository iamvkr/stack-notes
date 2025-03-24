import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FilesContext from './context/FilesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilesContext>
      <App />
    </FilesContext>
  </StrictMode>,
)

