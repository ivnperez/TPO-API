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

export const getPlataformas = () => {
    return fetch(urlServer2 + `catalogo/plataformas`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.error('Error en getPlataformas:', error);
            return [];
        });
};

export const getGeneros = () => {
    return fetch(urlServer2 + `catalogo/generos`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.error('Error en getGeneros:', error);
            return [];
        });
};

export const getFiltros = async () => {
    try {
        const tipos = await getTipos();
        const plataformas = await getPlataformas();
        const generos = await getGeneros();
        
        return {
            tipos,
            plataformas,
            generos
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
        .then((data) => data)
        .catch((error) => {
            console.error('Error en getProductosFiltros:', error);
            return [];
        });
};
