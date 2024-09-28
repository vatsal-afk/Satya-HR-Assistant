import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dash from './dash.jsx';
//import Login from './login.jsx';
//import PrivateRoute from './PrivateRoute.jsx';
import Upload from './uploads';


function App() {
  return (
    <Router>
      <Routes>
{/* <Route path="/" element={<Login />} /> */}
        <Route
          path="/"
          element={<Dash name="JohnDoe" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/upload" element={<Upload />} /> 
      </Routes>
    </Router>
  );
}

export default App;