import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const urlServer2 = "http://localhost:8080/"; // Esta es la URL del backend

// Funciones para operaciones asíncronas utilizando Fetch
const getProductos = () => {
  return fetch(urlServer2 + 'catalogo')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los productos.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data getAll:", data);
      return data.content; // Asegurándome de que se accede correctamente a la lista de productos
    });
};

const agregarProducto = (producto) => {
  const formData = new FormData();
  formData.append("nombre", producto.nombre);
  formData.append("descripcion", producto.descripcion);
  formData.append("imagen", producto.imagen); // La imagen debe ser un Blob/File
  formData.append("precio", producto.precio);
  formData.append("descuento", producto.descuento || 0); // Default value if descuento is null
  formData.append("lanzamiento", producto.anioLanzamiento);
  formData.append("desarrollador", producto.desarrollador);
  formData.append("tipo", producto.tipo);
  formData.append("stock", producto.stock);
  formData.append("flag_destacar", producto.flag_destacar);

  return fetch(`${urlServer2}abm`, {
    method: "POST",
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || "Error al agregar el producto.");
        });
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

const eliminarProducto = (id) => {
  return fetch(`${urlServer2}abm/${id}`, {
    method: "DELETE",
  }).then(response => response.json());
};

const modificarProducto = (producto) => {
  console.log(JSON.stringify({
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    descuento: producto.descuento || 0, // Default value if descuento is null
    lanzamiento: producto.anioLanzamiento,
    desarrollador: producto.desarrollador,
    tipo: producto.tipo,
    stock: producto.stock,
    flag_destacar: producto.flag_destacar
  }));
  return fetch(`${urlServer2}abm`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      descuento: producto.descuento || 0, // Default value if descuento is null
      lanzamiento: producto.anioLanzamiento,
      desarrollador: producto.desarrollador,
      tipo: producto.tipo,
      stock: producto.stock,
      flag_destacar: producto.flag_destacar
    })
  }).then(response => response.json());
};




// Thunks para operaciones asíncronas
export const fetchProductos = createAsyncThunk('productos/fetchProductos', async () => {
  const response = await getProductos();
  return response;
});

export const createProducto = createAsyncThunk('productos/createProducto', async (nuevoProducto) => {
  const response = await agregarProducto(nuevoProducto);
  return response;
});

export const deleteProducto = createAsyncThunk('productos/deleteProducto', async (id) => {
  await eliminarProducto(id);
  return id;
});

export const updateProducto = createAsyncThunk('productos/updateProducto', async (producto) => {
  const response = await modificarProducto(producto);
  return response;
});

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
