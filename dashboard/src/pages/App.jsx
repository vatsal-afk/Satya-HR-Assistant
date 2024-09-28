
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Dash from "./dash";

import Upload from './uploads';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dash from './dash.jsx';
//import Login from './login.jsx';
//import PrivateRoute from './PrivateRoute.jsx';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/dash" element={<Dash />} /> {/* Define the rankings route */}

        <Route path="/upload" element={<Upload />} /> 
      </Routes>
    </Router>
  );
}




export default App;

