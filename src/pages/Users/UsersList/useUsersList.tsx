import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import { fetchUsers, removeUser, selectError, selectLoading, selectUsers } from '../../../features/Users/userSlice';
import { useNavigate } from 'react-router-dom';

const useUsersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectUsers);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const showDetail = (id: number | string) => {
        navigate(`/users/${id}`);
    }

    const showRoles = (id: number) => {
        navigate(`/users/${id}/roles`);
    }

    useEffect(() => {
        dispatch(fetchUsers({}));
    }, [dispatch]);

    const handleDeleteUser = (id: number) => {
        dispatch(removeUser(id));
    };

    return {
        error,
        handleDeleteUser,
        loading,
        showDetail,
        showRoles,        
        users,
    };
}

export default useUsersList;