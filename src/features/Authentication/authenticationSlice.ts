import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin, refreshAccessToken as apiRefreshAccessToken } from '../../services/authentication.service';
import { AuthenticationState, LoginCredentials } from './authenticationTypes';
import { RootState } from '../store';
import { tokenStorageService } from '../../services';

const initialState: AuthenticationState = {
    accessToken: tokenStorageService.getAccessToken(),
    isAuthenticated: !!tokenStorageService.getAccessToken(),
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'authentication/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await apiLogin(credentials);
            if (response.success) {
                if (response.accessToken) {
                    tokenStorageService.setAccessToken(response.accessToken);
                    tokenStorageService.setRefreshToken(response.refreshToken);
                } else {
                    return rejectWithValue('Invalid token.');
                }            
            } else {
                return rejectWithValue(response.message);
            }
            return response.accessToken;
        } catch (error) {
            return rejectWithValue(`Failed to log in: ${(error as Error).message}`);
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    'authentication/refreshAccessToken',
    async () => {
        try {
            const refreshToken = tokenStorageService.getRefreshToken();
            if (refreshToken) {
                const response = await apiRefreshAccessToken({ token: refreshToken });
                if (response.success) {
                    tokenStorageService.setAccessToken(response.accessToken);
                }
            }            
        } catch (error) {

        }
    }
)


export const logout = createAsyncThunk(
    'authentication/logout',
    async () => {
        tokenStorageService.removeAccessToken();
    }
)

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
            });
    }
});

export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated;
export const selectAuthenticationLoading = (state: RootState) => state.authentication.loading;
export const selectAuthError = (state: RootState) => state.authentication.error;

export default authenticationSlice.reducer;