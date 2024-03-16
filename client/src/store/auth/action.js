import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

export const loginUser = createAsyncThunk(
    'login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const initialState = {
    email: '',
    role: '',
    status: 'idle',
    error: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token'); 
            state.email = null;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload.user.email;
                state.role = action.payload.user.role;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;