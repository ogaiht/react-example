import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Role } from '../../models';
import { roleService } from '../../services';
import { Pagination } from '../../services/dtos';
import { RootState } from './../store';

interface RolesState {
    roles: Role[];
    offset: number;
    limit: number;
    total: number;
    loading:boolean;
    error: string | null;
}

const initialState: RolesState = {
    roles: [],
    offset: 0,
    limit: Number.MAX_VALUE,
    total: 0,
    loading: false,
    error: null
};

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (filter?:Pagination) => {
    return await roleService.list(filter);
});

export const addRole = createAsyncThunk('roles/addRole', async (role: Omit<Role, 'id'>) => {
    const id = await roleService.create(role);
    return {...role, id};
});

export const editRole = createAsyncThunk('roles/editRole', async ({id, role} : {id:number, role:Omit<Role, 'id'>}) => {
    if (await roleService.update(id, role)) {
        return {
            id,
            role
        };
    } else {
        return null;
    }
});

export const removeRole = createAsyncThunk('roles/removeRole', async (id:number) => {
    if (await roleService.delete(id)) {
        return id;
    } else {
        return -1;
    }    
});

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload.data;
                state.offset = action.payload.offset;
                state.limit = action.payload.limit;
                state.total = action.payload.total;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users.';
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.roles.push(action.payload)
            })
            .addCase(editRole.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.roles.findIndex((r) => r.id === action.payload?.id);
                    if (index !== -1) {
                        state.roles[index] = {...action.payload.role, id: action.payload.id};
                    }
                }
                
            })
            .addCase(removeRole.fulfilled, (state, action) => {
                if (action.payload > 0) {
                    state.roles = state.roles.filter((r) => r.id !== action.payload);
                }                
            });
    }
});

export const selectRoleById = (roleId: number) => (state: RootState): Role | undefined => state.roles.roles.find((r) => r.id === roleId);
export const selectRoles = (state: RootState) => state.roles.roles;
export const selectLoading = (state: RootState) => state.roles.loading;
export const selectError = (state: RootState) => state.roles.error;

export default rolesSlice.reducer;