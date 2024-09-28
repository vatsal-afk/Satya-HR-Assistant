import React, { useState } from 'react';
import Dash from './dash.jsx';
import Login from './login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dash />} /> 
      </Routes>
    </Router>
  );
}

export default App;