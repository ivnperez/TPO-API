import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';  
import abmReducer from './features/abmSlice';
import carritoReducer from './features/carritoSlice'; 
import productoReducer from './features/productoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    abm: abmReducer,
    carrito: carritoReducer,
    productos: productoReducer,
  },
});

export default store;
