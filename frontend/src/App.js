// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllurePage from './Pages/land'; // landing page
import Home from './Pages/home';       // your home page
import Login from './Pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllurePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
