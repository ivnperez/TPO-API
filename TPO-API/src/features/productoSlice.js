import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const urlServer2 = "http://localhost:8080/"; // URL del backend

// Thunks para operaciones asíncronas utilizando Fetch

export const fetchProductos = createAsyncThunk(
  "productos/fetchProductos",
  async () => {
    const response = await fetch(urlServer2 + "catalogo");
    if (!response.ok) {
      throw new Error("Error al obtener los productos.");
    }
    const data = await response.json();
    return data.content; // Asegurándome de que se accede correctamente a la lista de productos
  }
);

export const fetchProductoByID = createAsyncThunk(
  "productos/fetchProductoByID",
  async (id) => {
    const response = await fetch(`${urlServer2}catalogo/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("El producto no existe.");
      } else {
        throw new Error("Error al obtener el producto.");
      }
    }
    return await response.json();
  }
);

export const fetchProductosDestacados = createAsyncThunk(
  "productos/fetchProductosDestacados",
  async () => {
    const response = await fetch(urlServer2 + "catalogo");
    if (!response.ok) {
      throw new Error("Error al obtener los productos.");
    }
    const data = await response.json();
    return data.content.filter((producto) => producto.flag_destacar === true);
  }
);

export const fetchJuegos = createAsyncThunk(
  "productos/fetchJuegos",
  async () => {
    const response = await fetch(urlServer2 + "catalogo");
    if (!response.ok) {
      throw new Error("Error al obtener los productos.");
    }
    const data = await response.json();
    return data.content.filter((producto) => producto.tipo === 2);
  }
);

const productoSlice = createSlice({
  name: "productos",
  initialState: {
    items: [],
    productoSeleccionado: null,
    destacados: [],
    juegos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductoByID.fulfilled, (state, action) => {
        state.productoSeleccionado = action.payload;
      })
      .addCase(fetchProductosDestacados.fulfilled, (state, action) => {
        state.destacados = action.payload;
      })
      .addCase(fetchJuegos.fulfilled, (state, action) => {
        state.juegos = action.payload;
      });
  },
});

export default productoSlice.reducer;
