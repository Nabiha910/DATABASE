// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllurePage from './Pages/land'; // landing page
import Home from './Pages/home';       // your home page
import Login from './Pages/login'; // ✅ this will now work
import Women from './Pages/Women';
import Cart from './Pages/Cart';
import './App.css'; // Import your CSS file 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllurePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/women" element={<Women />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </Router>
  );
}

export default App;
