import React, { useState } from 'react';
import './BurgerMenu.css'; 

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      {/* Burger icon */}
      <div className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
