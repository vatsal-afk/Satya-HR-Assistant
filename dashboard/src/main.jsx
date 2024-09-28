import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Dashboard from './components/dashboard.jsx'
import NavBar from './components/navBar.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    
  </StrictMode>,
)
