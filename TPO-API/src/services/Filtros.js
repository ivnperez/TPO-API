const urlServer2 = "http://localhost:8080/"; // URL del backend

export const getTipos = () => {
    return fetch(urlServer2 + `catalogo/tipo`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.error('Error en getTipos:', error);
            return [];
        });
};

export const getFiltros = async () => {
    try {
        const tipos = await getTipos();
        return {
            tipos
        };
    } catch (error) {
        console.error('Error en getFiltros:', error);
        throw error;
    }
};

export const getProductosFiltros = (filtroProductos) => {
    let url = urlServer2 + `catalogo/filtro`;
    if (filtroProductos.tipos.length > 0) {
        url += `?tipoId=${filtroProductos.tipos[0]}`; // Suponiendo que solo se filtra por un tipo a la vez
    }

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Productos filtrados obtenidos:", data);
            return data;
        })
        .catch((error) => {
            console.error('Error en getProductosFiltros:', error);
            return [];
        });
};
