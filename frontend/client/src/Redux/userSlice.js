import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
});

export const { setUser, setUserData } = userSlice.actions;
export default userSlice.reducer;
