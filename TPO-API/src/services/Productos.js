const urlServer = "http://localhost:3000/";

export const getProductos = () => {
    return fetch(urlServer + `productos`)
        .then((response) => {
            console.log('Response getAll:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getAll:', data);
            return data;
        });
}

export const getProductoByID = (id) => {
    return fetch(urlServer + `productos/${id}`)
        .then((response) => {
            console.log('Response getProductoByID:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getProductoByID:', data);
            return data;
        });
}

export const getProductosDestacados = () => {
    return fetch(urlServer + `productos/`)
        .then((response) => {
            console.log('Response getProductosDestacados:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getProductosDestacados:', data);
            const items = data.filter(producto => producto.destacar === true);
            return items;
        })
        .catch((error) => {
            console.error('Error en getProductosDestacados:', error);
            return [];
        });
} 

export const getJuegos = () => {
    return fetch(urlServer + `productos/`)
        .then((response) => {
            console.log('Response getJuegos:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getJuegos:', data);
            const items = data.filter(producto => producto.tipo === 2);
            return items;
        })
        .catch((error) => {
            console.error('Error en getJuegos:', error);
            return [];
        });
} 

export const getConsolas = () => {
    return fetch(urlServer + `productos/`)
        .then((response) => {
            console.log('Response getConsolas:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getConsolas:', data);
            const items = data.filter(producto => producto.tipo === 2);
            return items;
        })
        .catch((error) => {
            console.error('Error en getConsolas:', error);
            return [];
        });
} 

export const getTiposProducto = () => {
    return fetch(urlServer + `tipos`)
        .then((response) => {
            console.log('Response getTiposProducto:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getTiposProducto:', data);
            return data;
        });
} 

export const getPlataformasProducto = () => {
    return fetch(urlServer + `plataformas`)
        .then((response) => {
            console.log('Response getPlataformasProducto:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getPlataformasProducto:', data);
            return data;
        });
} 

export const getGeneros = () => {
    return fetch(urlServer + `generos`)
        .then((response) => {
            console.log('Response getGeneros:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data getGeneros:', data);
            return data;
        });
} 


export const getProductosFiltros = (filtroProductos) => {
    return fetch(urlServer + `productos/`)
        .then((response) => {
            console.log('Response getProductosFiltros:', response);
            return response.json();
        })
        .then((data) => {
            
            let items = [...data];
            
            if (filtroProductos.tipos.length > 0) {
                items = items.filter(producto => producto.tipo.some(tipo => filtroProductos.tipos.includes(tipo)));
            }
            
            if (filtroProductos.generos.length > 0) {
                items = items.filter(producto => producto.genero.some(genero => filtroProductos.generos.includes(genero)));
            }
            
            if (filtroProductos.plataformas.length > 0) {
                items = items.filter(producto => producto.plataforma.some(plataforma => filtroProductos.plataformas.includes(plataforma)));
            }
            console.log('Data getProductosFiltros:', items);
            return items;
        })
        .catch((error) => {
            console.error('Error en getProductosFiltros:', error);
            return [];
        });
}

