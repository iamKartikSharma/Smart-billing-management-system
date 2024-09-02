import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to handle current route
import './Navbar.css';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isLoginPage = location.pathname === '/login-signup';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Link to="/" onClick={toggleMenu}>InvoiceIQ.</Link>
        </div>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          {!isLoginPage && (
            <>
              <a href="#section1" onClick={toggleMenu}>About</a>
              <a href="#section4" onClick={toggleMenu}>Products</a>
              <a href="#section3" onClick={toggleMenu}>For You</a>
              <a href="#section5" onClick={toggleMenu}>FAQ</a>
            </>
          )}
          <div className='nav-btns'>
            <Link to="/login-signup">
              <button className="login">Login</button>
            </Link>
            <Link to="/login-signup">
              <button className="signup">Signup</button>
            </Link>
          </div>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <XIcon className="icon" /> : <MenuIcon className="icon" />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
