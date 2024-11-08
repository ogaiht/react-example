import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './ProfileState';
import { fetchMyProfile } from './ProfileThunks';

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProfile.pending, (state) => {
                state.loading = true;
                state.errors = false;
            })
            .addCase(fetchMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = false;
                state.profile = action.payload;
            });
    }
});

export default profileSlice.reducer;