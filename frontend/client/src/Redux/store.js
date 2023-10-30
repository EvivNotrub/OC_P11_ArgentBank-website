

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer, // more slices here
  },
});

export default store;