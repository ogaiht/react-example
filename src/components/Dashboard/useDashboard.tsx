import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuthenticated } from '../../features/Authentication/authenticationSlice';
import { AppDispatch } from '../../features/store';

const useDashboard = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(logout())
    };

    return {
        isAuthenticated,
        handleLogout
    }
};

export default useDashboard;