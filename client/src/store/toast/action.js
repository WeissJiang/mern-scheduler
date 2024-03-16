import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: '',
    type: 'info', // such as 'success', 'error', 'info'
  },
  reducers: {
    setToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearToast: state => {
      state.message = null;
      state.type = 'info';
    }
  }
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;