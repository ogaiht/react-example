import { FC, ReactNode } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

type PrivateRouteProps = RouteProps & {
    element: ReactNode;
    requiredRole?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = (privateRouteProps:PrivateRouteProps) => {
    const { element, requiredRole } = privateRouteProps;
    const isAuthenticated = true;
    const userRole = '';
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    if (requiredRole && userRole !== requiredRole) {
        return <></>;
        //return <Navigate to='/unauthorized' replace />
    }
    return <>{element}</>
};

export default PrivateRoute;