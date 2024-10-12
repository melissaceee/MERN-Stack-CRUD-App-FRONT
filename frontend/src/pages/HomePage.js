import React from 'react';
import { Link } from 'react-router-dom';  
import './HomePage.css';


const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to Verdant Eatery</h1>
      <p>Discover our delicious menu items, carefully curated just for you.</p>
      <img src="mainlogo.png" alt="Delicious food" />
      <div className="action">
        <Link to="/menu">
          <button className="button">Explore the Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
