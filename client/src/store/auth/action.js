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

const isUserAuthenticated = !!localStorage.getItem('token');

const initialState = {
    user: null,
    authenticated: isUserAuthenticated,
    status: 'idle',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token'); 
            state.authenticated = false;
        },
        checkAuthentication: (state) => {
            const token = localStorage.getItem('token');
            state.authenticated = !!token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
})

export const { logout, checkAuthentication  } = authSlice.actions;
export default authSlice.reducer;