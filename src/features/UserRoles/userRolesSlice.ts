import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserRoles, addRoleToUser as addRoleToUserAPI, removeRoleFromUser as removeRoleFromUserAPI, roleService } from '../../services';
import { RootState } from '../store';

interface UserRolesState {
    userId: number;
    roleIds: number[];
    loading: boolean;
    error: string | null;
}

const initialState: UserRolesState = {
    userId: -1,
    roleIds: [],
    loading: false,
    error: null
};

export const fetchUserRoles = createAsyncThunk(
    'userRoles/fetchUserRoles',
    async (userId:number, { rejectWithValue }) => {
        try {
            const roleIds = await getUserRoles(userId);
            return { userId, roleIds };
        } catch (error) {
            rejectWithValue('Error fetching user roles');
        }
    }
);

interface UserRole {
    userId:number;
    roleId:number;
}

export const addRoleToUser = createAsyncThunk(
    'userRoles/addRoletoUser',
    async (userRole:UserRole) => {
        await addRoleToUserAPI(userRole.userId, userRole.roleId);
        return userRole.roleId;
    }
);

export const removeRoleFromUser = createAsyncThunk(
    'userRoles/removeRoleFromUser',
    async (userRole:UserRole) => {
        if (await removeRoleFromUserAPI(userRole.userId, userRole.roleId)) {
            return userRole.roleId;
        }
        return -1;
    }
);

const userRoleSlice = createSlice({
    name:'userRoles',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(addRoleToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRoleToUser.fulfilled, (state, action) => {
                state.loading = false;
                state.roleIds = [...state.roleIds, action.payload];
            })
            .addCase(removeRoleFromUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeRoleFromUser.fulfilled, (state, action) => {
                state.loading = false;
                state.roleIds = [...state.roleIds.splice(state.roleIds.indexOf(action.payload), 1)];
            })
            .addCase(fetchUserRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload?.userId ?? -1;
                state.roleIds = action.payload?.roleIds ?? [];
            });

    },
});

export const selectUserRoles = (state: RootState) => state.userRoles.roleIds;
export const selectLoading = (state: RootState) => state.userRoles.loading;
export const selectError = (state: RootState) => state.userRoles.error;

export default userRoleSlice.reducer;