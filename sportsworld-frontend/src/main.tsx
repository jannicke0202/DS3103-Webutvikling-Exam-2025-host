import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SportsWorldProvider } from './context/SportsWorldContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SportsWorldProvider>
    <App />
    </SportsWorldProvider>
  </StrictMode>,
)
