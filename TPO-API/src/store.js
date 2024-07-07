import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';  // Asegúrate de que esta ruta sea correcta

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
