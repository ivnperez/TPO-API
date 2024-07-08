import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductos, agregarProducto, eliminarProducto, modificarProducto } from '../services/Productos';

// Thunks para operaciones asíncronas
export const fetchProductos = createAsyncThunk(
  'productos/fetchProductos',
  async () => {
    const response = await getProductos();
    return response;
  }
);

export const createProducto = createAsyncThunk(
  'productos/createProducto',
  async (nuevoProducto) => {
    const response = await agregarProducto(nuevoProducto);
    return response;
  }
);

export const deleteProducto = createAsyncThunk(
  'productos/deleteProducto',
  async (id) => {
    await eliminarProducto(id);
    return id;
  }
);

export const updateProducto = createAsyncThunk(
  'productos/updateProducto',
  async (producto) => {
    const response = await modificarProducto(producto);
    return response;
  }
);

// Slice
const abmSlice = createSlice({
  name: 'productos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProducto.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateProducto.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
      });
  },
});

export default abmSlice.reducer;

