import { configureStore } from '@reduxjs/toolkit'
import chatsReducer from './chats/slice'

export default configureStore({
  reducer: {
    chats: chatsReducer
  }
})