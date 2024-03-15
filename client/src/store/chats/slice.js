import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Chat', content: 'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.', contact: 'Able' },
  { id: '2', title: 'Second Chat', content: 'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.', contact: 'Bubble' }
]

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { chatAdded } = chatsSlice.actions
export default chatsSlice.reducer;

export const selectAllChats = state => state.chats;
export const selectChatById = (state, id) => state.chats.find(x => x.id === id);