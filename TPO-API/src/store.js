import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';  
import abmReducer from './features/abmSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    abm: abmReducer
  },
});

export default store;
