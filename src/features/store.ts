import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './Roles/roleSlice';
import userReducer from './Users/userSlice';
import userRolesReducer from './UserRoles/userRolesSlice';
import autheticationReducer from './Authentication/authenticationSlice';
import profileReducer from './Profile/ProfileSlice';

export const store = configureStore({
    reducer: {
        authentication: autheticationReducer,
        profile: profileReducer,
        roles: roleReducer,
        users: userReducer,
        userRoles: userRolesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;