import React from "react";
import Home from "./components/Home";
import { Link, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            SYNTHETIC ATELIER
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className="nav-link">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/About" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 Synthetic Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
