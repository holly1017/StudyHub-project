import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return <>{element}</>; // 직접 element를 반환합니다.
};

export default ProtectedRoute;
