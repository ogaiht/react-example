import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthorizationState {
    isAuthorized: boolean;
}

const initialState:AuthorizationState = {
    isAuthorized: false
};