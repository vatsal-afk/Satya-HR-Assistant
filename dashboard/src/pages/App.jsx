import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Dash from "./dash";

import Upload from './uploads';
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
