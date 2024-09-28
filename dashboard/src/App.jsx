import React,{ useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import UserLogin from './components/UserLogin.jsx';

function App() {
  

  return (
    <>
      <div>
      
     
     

      <Router>
        <Routes>
          <Route path="/" element={<UserLogin/>} />
          
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
