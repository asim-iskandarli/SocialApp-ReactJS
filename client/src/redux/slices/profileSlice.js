import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        updateProfileUser: (state, action) => {
            state.users = [...state.users.map(user => user.id === action.payload.id ? {...user, ...action.payload} : user)]
        },
        createUserPost: (state, action) => {
            state.users = [...state.users.map(user => user.id === action.payload.author.id ?
                { ...user, posts: [action.payload, ...user.posts] }
                :
                user)]
        },
        deleteUserPost: (state, action) => {
            state.users = [...state.users.map(user => user.id === action.payload.authorId ?
                { ...user, posts: user.posts.filter(p => p.id !== action.payload.id) }
                :
                user)]
        },
        updateUserPost: (state, action) => {
            state.users = [...state.users.map(user => user.id === action.payload.author.id ?
                { ...user, posts: [...user.posts.map(post => post.id === action.payload.id ? action.payload : post)] }
                :
                user)]
        }
    }
});

export const { getUser, createUserPost, deleteUserPost, updateUserPost, updateProfileUser } = profileSlice.actions;
export default profileSlice.reducer;