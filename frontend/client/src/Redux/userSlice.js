import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    user: null,
    hasToken: false,
    validToken: false,
    userData: null,
    rememberMe: false,
  },
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setHasToken: (state, action) => {
      state.hasToken = action.payload;
    },
    setValidToken: (state, action) => {
      state.validToken = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
});

export const { setAuthorized, setUser, setHasToken, setValidToken, setUserData, setRememberMe } = userSlice.actions;
export default userSlice.reducer;
