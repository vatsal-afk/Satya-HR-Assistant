import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Dash from "./components/dash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dash" element={<Dash />} /> {/* Define the rankings route */}
      </Routes>
    </Router>
  );
}

export default App;
