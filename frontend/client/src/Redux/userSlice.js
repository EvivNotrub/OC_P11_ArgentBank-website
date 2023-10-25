import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    user: null,
    hasToken: false,
    userData: null,
  },
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setValidToken: (state, action) => {
      state.hasToken = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
});

export const { setAuthorized, setUser, setValidToken, setUserData } = userSlice.actions;
export default userSlice.reducer;
