import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    postsLoad: true,
}


const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload
        },
        createPost: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(p => p.id !== action.payload.id)
        },
        updatePost: (state, action) => {
            state.posts = [...state.posts.map(post => post.id === action.payload.id ? action.payload : post)]
        },
        postsLoad: (state, action) => {
            state.postsLoad = action.payload
        }
    }
});

export const { getPosts, createPost, deletePost, updatePost, postsLoad } = postSlice.actions;
export default postSlice.reducer;