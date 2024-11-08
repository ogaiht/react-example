import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import { Role } from '../../../models';
import {
    addRole,
    editRole,
    selectRoleById
} from '../../../features/Roles/roleSlice';

const defaultRole: Role = {
    id: -1,
    name: '',
    description: ''
};

const ROLES_PAGE_URL = '/roles';

const useRoleDetail = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isEditMode = !isNaN(Number(id));
    const roleId = isEditMode ? Number(id) : undefined;

    const roleToEdit = useSelector(roleId ? selectRoleById(Number(id)) : () => undefined);

    const [role, setRole] = useState(defaultRole);

    const navigateBack = () => {
        navigate(ROLES_PAGE_URL);
    }

    useEffect(() => {
        if (isEditMode && roleToEdit) {
            setRole(roleToEdit);
        }
    }, [isEditMode, roleToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value });
    };

    const handleSave = () => {
        if (isEditMode) {
            dispatch(editRole({ id: role.id, role }));
        } else {
            dispatch(addRole(role));
        }
        navigateBack();
    };

    const handleCancel = () => {
        navigateBack();
    }

    return {
        isEditMode,
        handleCancel,
        handleChange,
        handleSave,
        navigateBack,
        role
    };
};

export default useRoleDetail;
