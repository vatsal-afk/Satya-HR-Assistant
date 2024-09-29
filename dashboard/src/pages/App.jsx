
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Dash from "./dash";

import Upload from './uploads';
import UserLogin from "../components/UserLogin";




//import Login from './login.jsx';
//import PrivateRoute from './PrivateRoute.jsx';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/dashboard/dash" element={<Dash />} /> {/* Define the rankings route */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/upload" element={<Upload />} /> 
      </Routes>
    </Router>
  );
}




export default App;

