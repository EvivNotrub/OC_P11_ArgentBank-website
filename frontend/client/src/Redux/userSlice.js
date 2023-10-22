// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    user: null,
  },
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthorized, setUser } = userSlice.actions;
export default userSlice.reducer;
