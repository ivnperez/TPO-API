import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = 'succeeded';
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;