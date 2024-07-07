const urlServer = "http://localhost:3000/";

//GETs
const obtenerUltimoID = () => {
    return fetch(urlServer + `productos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos.");
        }
        return response.json();
      })
      .then((productos) => {
        const ids = productos.map(producto => producto.id);
        return Math.max(...ids);
      });
  };
  
export const getProductos = () => {
  return fetch(urlServer + `productos`)
    .then((response) => {
      console.log("Response getAll:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data getAll:", data);
      return data;
    });
};

export const getProductoByID = (id) => {
  return fetch(urlServer + `productos/${id}`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("El producto no existe.");
        } else {
          throw new Error("Error al obtener el producto.");
        }
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getProductosDestacados = () => {
  return fetch(urlServer + `productos/`)
    .then((response) => {
      console.log("Response getProductosDestacados:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data getProductosDestacados:", data);
      const items = data.filter((producto) => producto.destacar === true);
      return items;
    })
    .catch((error) => {
      console.error("Error en getProductosDestacados:", error);
      return [];
    });
};

export const getJuegos = () => {
  return fetch(urlServer + `productos/`)
    .then((response) => {
      console.log("Response getJuegos:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data getJuegos:", data);
      const items = data.filter((producto) => producto.tipo === 2);
      return items;
    })
    .catch((error) => {
      console.error("Error en getJuegos:", error);
      return [];
    });
};

export const getConsolas = () => {
  return fetch(urlServer + `productos/`)
    .then((response) => {
      console.log("Response getConsolas:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data getConsolas:", data);
      const items = data.filter((producto) => producto.tipo === 2);
      return items;
    })
    .catch((error) => {
      console.error("Error en getConsolas:", error);
      return [];
    });
};


//POST
export const agregarProducto = (producto) => {
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

  console.log("FormData antes de enviar:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  return fetch("http://localhost:8080/abm", {
    method: "POST",
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || "Error al agregar el producto.");
        });
      }
      console.log("Response agregarProducto:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data agregarProducto:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al agregar el producto:", error);
      throw error;
    });
};


  
//DELETE
export const eliminarProducto = (id) => {
  return fetch(urlServer + `productos/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      console.log("Response eliminarProducto:", response);
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data eliminarProducto:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
      throw error;
    });
};

//PUT
export const modificarProducto = (producto) => {
  return fetch(urlServer + `productos/${producto.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  })
    .then((response) => {
      console.log("Response modificarProducto:", response);
      if (!response.ok) {
        throw new Error("Error al modificar el producto");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data modificarProducto:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al modificar el producto:", error);
      throw error;
    });
};
