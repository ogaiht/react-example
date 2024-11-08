import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyProfile } from '../../services/profile.service';

export const fetchMyProfile = createAsyncThunk('profile/mine', async () =>{
    return await getMyProfile();
})