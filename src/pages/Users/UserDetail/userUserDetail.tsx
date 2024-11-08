import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap';
import { User } from '../../../models';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import { addUser, editUser, selectUserById } from '../../../features/Users/userSlice';

const defaultUser: User = {
    id: -1,
    name: '',
    email: ''
};

const USERS_PAGE_URL = '/users';

const useUserDetail = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isEditMode = !isNaN(Number(id));
    const userId = isEditMode ? Number(id) : undefined;

    const userToEdit = useSelector(userId ? selectUserById(Number(id)) : () => undefined);
    const [user, setUser] = useState<User>(defaultUser);

    const handleSubmit = () => {
        if (isEditMode) {
            dispatch(editUser({ id: user.id, user }));
        } else {
            dispatch(addUser(user));
        }
        navigate(USERS_PAGE_URL);
    };

    const handleCancel = () => {
        navigate(USERS_PAGE_URL);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        if (isEditMode && userToEdit) {
            setUser(userToEdit);
        }
    }, [isEditMode, userToEdit]);

    return {
        handleCancel,
        handleChange,
        handleSubmit,
        isEditMode,
        user,
    };
};

export default useUserDetail;
