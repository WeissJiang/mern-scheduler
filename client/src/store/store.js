import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toast/action'
import chatsReducer from './chats/action';
import ticketsReducer from './tickets/action';
import storiesReducer from './stories/action';
import authReducer from './auth/action';

export default configureStore({
  reducer: {
    chats: chatsReducer,
    tickets: ticketsReducer,
    stories: storiesReducer,
    toast: toastReducer,
    auth: authReducer
  }
})