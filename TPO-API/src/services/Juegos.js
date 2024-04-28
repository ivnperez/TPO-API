export const getAll = () => {
    return fetch("http://localhost:3000/productos")
        .then((response) => {
            console.log('Response:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data:', data);
            return data;
        });
}

export const getByID = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`)
        .then((response) => {
            console.log('Response:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Data:', data);
            return data;
        });
}

export const getDestacados = () => {
    return fetch(`http://localhost:3000/productos/`)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                const destacados = data.filter(producto => producto.destacar === true);
                return destacados;
            } else {
                console.error('La respuesta de la API no contiene un array de productos:', data);
                return [];
            }
        })
        .catch((error) => {
            console.error('Error al obtener productos:', error);
            return [];
        });
} 