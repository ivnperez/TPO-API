import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';  
import abmReducer from './features/abmSlice';
import carritoReducer from './features/carritoSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    abm: abmReducer,
    carrito: carritoReducer
  },
});

export default store;
