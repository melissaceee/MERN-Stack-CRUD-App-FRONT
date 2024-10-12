import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import BurgerMenu from './components/BurgerMenu';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(''); // State for notifications

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const handleRequireLogin = () => {
        setNotification('Please log in to access the checkout page.');
        setIsAuthModalOpen(true);
    };

    return (
        <Router>
            <BurgerMenu />
            
            <div className="auth-button-container">
                {!user ? (
                    <>
                        <button onClick={() => setIsAuthModalOpen(true)} className="login-button">Login</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleSignOut} className="login-button">Sign Out</button>
                    </>
                )}
            </div>

            {/* Notification for login required */}
            {notification && <p style={{ color: 'red' }}>{notification}</p>}

            {/* Auth Modal */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
                setUser={setUser} 
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/checkout" element={
                    <ProtectedRoute user={user} onRequireLogin={handleRequireLogin}>
                        <CheckoutPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
