import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');;

const apiInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Authorization: token
    }
});

const initialState = {
    tickets: [],
    status: 'idle',
    error: null
}

export const fetchTickets = createAsyncThunk('ticket/fetchTicketr', async (_,{ rejectWithValue }) => {
    try {
        const response = await apiInstance.get(`/ticket`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateTicket = createAsyncThunk(
    'tickets/updateTicket',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await apiInstance.patch(`/ticket/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTickets.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchTickets.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tickets = action.payload.data;
        })
        .addCase(fetchTickets.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        // Add your updateTicket cases here
        .addCase(updateTicket.pending, (state) => {
            // Optionally, you could update the state to reflect the loading status of the update operation
            state.updateStatus = 'loading';
        })
        .addCase(updateTicket.fulfilled, (state, action) => {
            const index = state.tickets.findIndex(ticket => {
                return ticket._id === action.payload.data._id;
            });
            if (index !== -1) {
                // Replace the old ticket with the updated one in the state
                state.tickets[index] = action.payload.data;
            }
            // Optionally, reset/update the update status
            state.updateStatus = 'succeeded';
        })
        .addCase(updateTicket.rejected, (state, action) => {
            // Handle the case where the update operation fails, for example by setting an error message
            state.updateStatus = 'failed';
            state.error = action.error.message; // Or another piece of state dedicated to update errors
        });
    }
})

export default ticketsSlice.reducer;

export const selectAllTickets = state => state.tickets.tickets;
export const selectTicketById = (state, id) => state.tickets.find(t => t._id === id);