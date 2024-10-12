import React, { useEffect } from 'react';

const ProtectedRoute = ({ user, onRequireLogin, children }) => {
    useEffect(() => {
        if (!user) {
            onRequireLogin();
        }
    }, [user, onRequireLogin]);

    if (!user) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
