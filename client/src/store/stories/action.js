import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTgyNjBlODhiMTcyNzNjNTJhNzcwMyIsImlhdCI6MTcxMDQ4NjMzNywiZXhwIjoxNzEwNTI5NTM3fQ.XAvNsuM0jjHyxV1HgII6Rt1mVPe0ntOSXevqIMwMNUM';

const apiInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const initialState = {
    stories: [],
    status: 'idle',
    error: null
}

export const fetchStories = createAsyncThunk('story/fetchStories', async (_,{ rejectWithValue }) => {
    try {
        const response = await apiInstance.get(`/story`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateStory = createAsyncThunk(
    'story/updateStor',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await apiInstance.patch(`/story/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchStories.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchStories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.stories = action.payload.data;
        })
        .addCase(fetchStories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(updateStory.pending, (state) => {
            state.updateStatus = 'loading';
        })
        .addCase(updateStory.fulfilled, (state, action) => {
            const index = state.stories.findIndex(s => {
                return s._id === action.payload.data._id;
            });
            if (index !== -1) {
                state.stories[index] = action.payload.data;
            }
            state.updateStatus = 'succeeded';
        })
        .addCase(updateStory.rejected, (state, action) => {
            state.updateStatus = 'failed';
            state.error = action.error.message;
        });
    }
})

export default storiesSlice.reducer;

export const selectAllStories = state => state.stories.stories;