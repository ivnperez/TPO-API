import React, { useEffect, useState } from 'react';
import { getAll } from "../services/Juegos";
import '/src/css/Catalago.css';

function Catalogo() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getAll()
            .then(data => {
                console.log(data);
                setProductos(data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    return (
        <div className="catalogo-container">
            <div className="catalogo-grid">
                {productos.map(product => (
                    <div key={product.id} className="card" style={{ width: "18rem" }}>
                        <img src={product.imagen} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">{product.nombre}</h5>
                            <p className="card-text">{product.precio}</p>
                            <a href="#" className="btn btn-primary">Agregar al carrito</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;
