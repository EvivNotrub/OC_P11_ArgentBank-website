

// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Create this later

const store = configureStore({
  reducer: {
    user: userReducer, // You can add more slices here
  },
});

export default store;


// const store = () => {
//     return {
//         type: 'STORE',
//     };
// }
// export default store;
