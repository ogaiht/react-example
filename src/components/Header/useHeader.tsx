import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuthenticated } from '../../features/Authentication/authenticationSlice';
import { AppDispatch } from '../../features/store';
import { selectMyProfile } from '../../features/Profile/ProfileSelectors';
import { useEffect } from 'react';
import { fetchMyProfile } from '../../features/Profile/ProfileThunks';

const useHeader = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectMyProfile);

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())
    };

    return {
        isAuthenticated,
        handleLogout,
        profile
    };
};

export default useHeader;