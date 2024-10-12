import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view the checkout page');
                setLoading(false);
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/current-order`, config);
            setOrder(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load order');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const addItemToCart = async (menuItemId) => {
        if (!menuItemId) {
            console.error("menuItemId is undefined, cannot add item to cart.");
            setError("Unable to add item to cart, invalid item.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to be logged in to add items to the cart.');
                return;
            }
    
            const config = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            };
    
            const body = { 
                menuItemId: menuItemId, 
                quantity: 1, 
                paymentMethod: 'credit card'
            };
    
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add-item`, body, config);
            await fetchOrder();
        } catch (err) {
            setError('Failed to add item');
            console.error("Error adding item:", err);
        }
    };

    const removeItemFromCart = async (menuItemId) => {
        if (!menuItemId) {
            console.error("menuItemId is undefined, cannot remove item from cart.");
            setError("Unable to remove item from cart, invalid item.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/remove-item?menuItemId=${menuItemId}`, config);
            await fetchOrder();
        } catch (err) {
            setError('Failed to remove item');
        }
    };

    if (loading) {
        return <p className="loading-text">Loading your order...</p>;
    }

    if (error) {
        return <p className="error-text">{error}</p>;
    }

    if (!order || !order.items || order.items.length === 0) {
        return <p className="empty-cart-text">Your cart is empty</p>;
    }

    return (
        <div className="checkout-container">
            <h1 className="checkout-header">Checkout</h1>
            <div className="order-summary">
                <h2 className="summary-header">Order Summary</h2>
                <ul className="items-list">
                    {order.items.map((item, index) => {
                        const menuItemId = item.menuItem?._id;
                        
                        return (
                            <li key={index} className="item-card">
                                <div className="item-info">
                                    <h3 className="item-name">
                                        {item.menuItem?.itemname || 'Unknown Item'}
                                    </h3>
                                    <p className="item-description">
                                        {item.menuItem?.description || 'No description available'}
                                    </p>
                                </div>
                                <div className="item-actions">
                                    <div className="price-info">
                                        <span className="price">
                                            ${item.menuItem?.price ? item.menuItem.price.toFixed(2) : '0.00'}
                                        </span>
                                    </div>
                                    <div className="quantity-control">
                                        <button 
                                            onClick={() => removeItemFromCart(menuItemId)}
                                            disabled={!menuItemId}
                                            className="cart-button remove-button"
                                            aria-label="Remove item"
                                        >
                                            <span className="button-symbol">−</span>
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button 
                                            onClick={() => addItemToCart(menuItemId)}
                                            disabled={!menuItemId}
                                            className="cart-button add-button"
                                            aria-label="Add item"
                                        >
                                            <span className="button-symbol">+</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="total-price">
                    Total Price: ${order.totalprice.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;