import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../features/store';
import { fetchUserRoles, selectUserRoles, addRoleToUser, removeRoleFromUser } from '../../features/UserRoles/userRolesSlice';
import { fetchRoles, selectRoles } from '../../features/Roles/roleSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUserById } from '../../features/Users/userSlice';


const useRoleAssignment = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);
    const dispatch = useDispatch<AppDispatch>();
    const roleIds = useSelector(selectUserRoles);
    const roles = useSelector(selectRoles);
    const [assignedRoles, setAssignedRoles] = useState<number[]>(roleIds);
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    const isValidUser = !(isNaN(userId) || userId === -1);

    const user = useSelector(userId ? selectUserById(userId) : () => undefined);

    const navigateBack = () => {
        navigate('/users');
    };

    const handleDelete = (roleId: number) => {
        setAssignedRoles(assignedRoles.filter((id) => id !== roleId));
    };

    const handleSave = () => {
        const rolesToAdd = assignedRoles.filter((id) => roleIds.indexOf(id) === -1);
        const rolesToRemove = roleIds.filter((id) => assignedRoles.indexOf(id) === -1);
        for (let i = 0; i < rolesToRemove.length; i++) {
            dispatch(removeRoleFromUser({ userId, roleId: rolesToRemove[i] }));
        }
        for (let i = 0; i < rolesToAdd.length; i++) {
            dispatch(addRoleToUser({ userId, roleId: rolesToAdd[i] }));
        }
        navigateBack();
    };

    const handleAdd = () => {
        if (selectedRoleId !== null) {
            setAssignedRoles([...assignedRoles, selectedRoleId]);
        }
    };

    const handleCancel = () => {
        navigateBack();
    };

    useEffect(() => {
        dispatch(fetchRoles({}));
    }, [dispatch]);

    useEffect(() => {
        setAssignedRoles(roleIds);
    }, [roleIds]);

    useEffect(() => {
        dispatch(fetchUserRoles(userId));
    }, [dispatch, userId]);    

    return {
        assignedRoles,
        handleAdd,
        handleCancel,
        handleDelete,
        handleSave,
        isValidUser,
        roles,
        setSelectedRoleId,
        user    
    };
}

export default useRoleAssignment;