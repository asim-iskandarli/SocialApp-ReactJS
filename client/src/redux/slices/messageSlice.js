import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    conversations: [],
}

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        getAllUsers: (state, action) => {
            state.users = action.payload
        },
        getConversation: (state, action) => {
            state.conversations = [...state.conversations, action.payload]
        },
        updateConversation: (state, action) => {
            const message = action.payload;
            state.conversations =
                [...state.conversations.map(item =>
                    item.user.id === message.senderId || item.user.id === message.receiverId
                        ?
                        { ...item, messages: [...item.messages, message] }
                        :
                        item
                )]
        }
    }
});

export const { getAllUsers, getConversation, updateConversation } = messageSlice.actions;
export default messageSlice.reducer;