import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './chats/action';
import ticketsReducer from './tickets/action';
import storiesReducer from './stories/action';

export default configureStore({
  reducer: {
    chats: chatsReducer,
    tickets: ticketsReducer,
    stories: storiesReducer
  }
})