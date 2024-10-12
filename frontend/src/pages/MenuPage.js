import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MenuPage.css';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu/getitems`)
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        setError('Error fetching menu items');
      });
  }, []);

  const addToCart = (menuItem) => {
    const token = localStorage.getItem('token');
    const payload = {
      menuItemId: menuItem._id,
      quantity: 1,
      paymentMethod: 'credit card',
    };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add-item`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setNotification(`${menuItem.itemname} added to cart!`);
      setTimeout(() => setNotification(''), 2000);
    })
    .catch(error => {
      setError('Failed to add item to cart');
    });
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <button className="go-to-cart-btn" onClick={goToCheckout}>
          Go to Cart
        </button>
      </div>
      <div className="container">
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} className="menu-section">
            <h2 className="menu-section-title">{category}</h2>
            {items.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="menu-item-row">
                  <span className="menu-item-name">{item.itemname}</span>
                  <span className="menu-item-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="menu-item-description">{item.description}</div>
                <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                  +
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default MenuPage;