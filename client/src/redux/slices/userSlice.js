import {createSlice} from '@reduxjs/toolkit';

const initialState = { 
    loading: true,
    user: null
}
  

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null;
        },
        authLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateUser: (state, action) => {
            state.user = {...state.user, ...action.payload}
        }
    }
});

export const {getUser, clearUser, authLoading, updateUser} = userSlice.actions;
export default userSlice.reducer;