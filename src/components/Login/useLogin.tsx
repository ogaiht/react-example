import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuthenticationLoading, selectAuthError } from '../../features/Authentication/authenticationSlice';
import { AppDispatch } from '../../features/store';

const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectAuthenticationLoading);
    const error = useSelector(selectAuthError);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return {
        error,        
        handleSubmit,
        loading,
        password,
        setPassword,
        setUsername,
        username
    };
};

export default useLogin;