import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const confirmarCompra = createAsyncThunk(
  'carrito/confirmarCompra',
  async (compraData, { getState, rejectWithValue }) => {
    const state = getState();
    const usuarioId = compraData.id_usuario;

    if (!usuarioId) {
      console.error('Error: usuarioId is undefined');
      return rejectWithValue('Usuario no autenticado');
    }

    const url = 'http://localhost:8080/ventas';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(compraData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo confirmar la compra');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al confirmar la compra:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productos: [],
  status: 'idle',
  error: null,
};

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    agregarProducto: (state, action) => {
      const productoExistente = state.productos.find(producto => producto.id === action.payload.id);
      if (productoExistente) {
        productoExistente.cantidad += action.payload.cantidad;
      } else {
        state.productos.push({ ...action.payload, cantidad: 1 });
      }
    },
    eliminarProducto: (state, action) => {
      const productoExistente = state.productos.find(producto => producto.id === action.payload);
      if (productoExistente) {
        if (productoExistente.cantidad > 1) {
          productoExistente.cantidad -= 1;
        } else {
          state.productos = state.productos.filter(producto => producto.id !== action.payload);
        }
      }
    },
    eliminarTodoProducto: (state, action) => {
      state.productos = state.productos.filter(producto => producto.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.productos = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmarCompra.fulfilled, (state) => {
        state.productos = []; // Vaciar el carrito tras la compra
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(confirmarCompra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmarCompra.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { agregarProducto, eliminarProducto, eliminarTodoProducto, vaciarCarrito } = carritoSlice.actions;

export default carritoSlice.reducer;