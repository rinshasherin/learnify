import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './ContextApi/ContextProvider.jsx'
import AuthContext from './ContextApi/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <AuthContext>
          <App />
        </AuthContext>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
