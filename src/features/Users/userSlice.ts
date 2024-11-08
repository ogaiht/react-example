import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../models';
import { userService } from '../../services';
import { UserFilter } from '../../services/dtos';
import { RootState } from '../store';


interface UsersState {
    users: User[];
    offset: number;
    limit: number;
    total: number;
    loading:boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    offset: 0,
    limit: Number.MAX_VALUE,
    total: 0,
    loading: false,
    error: null
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers', 
    async (filter:UserFilter, { rejectWithValue }) => {
        try {
            return await userService.list(filter);
        } catch (error) {
            rejectWithValue('Error fetching users');
        }
    }
);

export const addUser = createAsyncThunk(
    'users/addUsers', 
    async (user: Omit<User, 'id'>) => {
        const id = await userService.create(user);
        return {...user, id};
    }
);

export const editUser = createAsyncThunk(
    'users/editUser',
        async ({id, user} : {id:number, user:Omit<User, 'id'>}) => {
        if (await userService.update(id, user)) {
            return {
                id,
                user
            };
        } else {
            return null;
        }
    }
);

export const removeUser = createAsyncThunk('users/removeUser', async (id:number) => {
    if (await userService.delete(id)) {
        return id;
    } else {
        return -1;
    }    
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.users = action.payload.data;
                    state.offset = action.payload.offset;
                    state.limit = action.payload.limit;
                    state.total = action.payload.total;
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users.';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(editUser.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.users.findIndex((u) => u.id === action.payload?.id);
                    if (index !== -1) {
                        state.users[index] = {...action.payload.user, id: action.payload.id};
                    }
                }
                
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                if (action.payload > 0) {
                    state.users = state.users.filter((u) => u.id !== action.payload);
                }                
            });
    }
});

export const selectUserById = (userId: number) => (state: RootState): User | undefined => state.users.users.find((u) => u.id === userId);
export const selectUsers = (state: RootState) => state.users.users;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

export default userSlice.reducer;