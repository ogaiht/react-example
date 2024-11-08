import React from 'react';
import useLogin from './useLogin';

const Login: React.FC = () => {

    const {
        error,
        handleSubmit,
        loading, 
        password,
        setPassword,
        setUsername,
        username
    } = useLogin();

    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            { error  && <p style={{color: 'red'}}>{error}</p>}
            <div>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit' disabled={loading}>
                { loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
};

export default Login;