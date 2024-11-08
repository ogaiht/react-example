import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import {
    fetchRoles,
    removeRole,
    selectError,
    selectLoading,
    selectRoles
} from '../../../features/Roles/roleSlice';
import { useNavigate } from 'react-router-dom';

const useRolesList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const roles = useSelector(selectRoles);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    const handleDeleteRole = (id: number) => {
        dispatch(removeRole(id));
    };

    const showDetail = (id: number | string) => {
        navigate(`/roles/${id}`);
    }

    return {
        error,
        handleDeleteRole,
        loading,
        roles,
        showDetail
    };
};

export default useRolesList;
