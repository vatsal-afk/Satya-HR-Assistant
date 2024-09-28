import React from 'react';
import Dash from './dash.jsx';
import Login from './login.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dash />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
