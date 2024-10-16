import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, onRequireLogin, children }) => {
    if (!user) {
        onRequireLogin(); // Show the login modal
        return <Navigate to="/" HomePage />; // Redirect to the homepage or any route while showing the modal.
    }
    return children;
};

export default ProtectedRoute;
