import React from 'react';
import useDashboard from './useDashboard';

const Dashboard: React.FC = () => {

    const { isAuthenticated, handleLogout } = useDashboard();
    
    if (!isAuthenticated) {
        return <p>Please log in to access the dashboard.</p>
    }
    return (
        <div>            
        </div>
    )
};

export default Dashboard;