import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import messageReducer from './slices/messageSlice';
import postReducer from './slices/postSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
    reducer: {
        userReducer,
        messageReducer,
        postReducer,
        profileReducer,
    }
});

export default store;