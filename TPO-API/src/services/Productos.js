
const urlServer = "http://localhost:3000/";  //Esta es la URL del json
const urlServer2 = "http://localhost:8080/"; //Esta  es la URL del back


//GETs

  export const getProductos = () => { // se usa
    return fetch(urlServer2 + `catalogo`)
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

export const getProductoByID = (id) => { // se usa
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

export const getProductosDestacados = () => { // se usa
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

export const getJuegos = () => { // pasarlo pero hay que cambiar el nombre a get tipo
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
