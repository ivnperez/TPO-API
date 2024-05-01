import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, createContext, useContext } from 'react';

// Creamos el contexto del carrito
const CarritoContext = createContext();

// Hook personalizado para utilizar el contexto del carrito
export const useCarrito = () => useContext(CarritoContext);

function CarritoCompras({ children }) {
    // Estado del carrito
    const [carrito, setCarrito] = useState([]);

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = (index) => {
        const nuevoCarrito = [...carrito];
        nuevoCarrito.splice(index, 1);
        setCarrito(nuevoCarrito);
    };

    // Función para confirmar la compra (simplemente limpia el carrito en este ejemplo)
    const confirmarCompra = () => {
        setCarrito([]);
    };

    const precioTotal = carrito.reduce((total, producto) => total + parseFloat(producto.precio.replace('$', '').replace(',', '')), 0);

    // Value para proporcionar al contexto del carrito
    const value = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        confirmarCompra
    };

    return (
        <CarritoContext.Provider value={value}>
        {children}
        <div className="modal fade" id="carritoModal" tabIndex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Mostrar productos en el carrito */}
                        {carrito.map((producto, index) => (
                            <div key={index}>
                                <p>{producto.nombre} - {producto.precio}</p>
                                {/* Botón para eliminar el producto del carrito */}
                                <button onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <p>Total: ${precioTotal.toFixed(2)}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        {/* Botón para confirmar la compra */}
                        <button type="button" className="btn btn-primary" onClick={confirmarCompra} data-bs-dismiss="modal">Confirmar Compra</button>
                    </div>
                </div>
            </div>
        </div>
        </CarritoContext.Provider>
    );
}

export default CarritoCompras;



