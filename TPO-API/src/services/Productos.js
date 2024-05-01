const urlServer = "http://localhost:3000/";


//GETs
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

//POST

