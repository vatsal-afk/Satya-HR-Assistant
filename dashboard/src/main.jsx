import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import './css/index.css'

import Dashboard from './pages/dashboard.jsx'
import NavBar from './components/navBar.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    
  </StrictMode>,
)
