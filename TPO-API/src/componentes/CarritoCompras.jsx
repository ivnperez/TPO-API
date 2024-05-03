import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, createContext, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/CarritoCompras.css";
const CarritoContext = createContext();

// Hook UseContext
export const useCarrito = () => useContext(CarritoContext);

function CarritoCompras({ children }) {
    //Estado del carrito
    const [carrito, setCarrito] = useState([]);

    //Agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
        
    };

    //Agregar un producto al carrito dentro del mismo carrito
    const incrementarCantidad = (producto) => {
        agregarAlCarrito({ ...producto });
    };


     //Decrementar en uno la cantidad del carrito
    const decrementarCantidad = (nombreProducto) => {
        const indiceUltimaAparicion = carrito.slice().reverse().findIndex((producto) => producto.nombre === nombreProducto);
        if (indiceUltimaAparicion !== -1) {
             const indiceReal = carrito.length - 1 - indiceUltimaAparicion; // Convertir el índice de atrás hacia adelante
            const nuevoCarrito = carrito.filter((_, index) => index !== indiceReal);
            setCarrito(nuevoCarrito);
        }
    };
    // eliminar un producto del carrito
    const eliminarDelCarrito = (nombreProducto) => {
        const nuevoCarrito = carrito.filter((producto) => producto.nombre !== nombreProducto);
        setCarrito(nuevoCarrito);
    };

    //confirmar la compra (como todavia no esta creado el usuario simplemente borra todo el carrito al confirma, arreglar mas tarde)
    const confirmarCompra = () => {
        setCarrito([]);
    };

    const borrarCarrito = () => {
        setCarrito([])
    };

    
    // Obtener el precio como número eliminando los caracteres no numéricos
    const precioTotal = carrito.reduce((total, producto) => {
        const precioNumerico = parseFloat(producto.precio.replace(/[^\d]+/g, ''));
        return total + precioNumerico;
    }, 0);

        // Agrupar productos por tipo y contar la cantidad de cada tipo
    const productosAgrupados = carrito.reduce((cant, producto) => {
            if (!cant[producto.nombre]) {
                cant[producto.nombre] = {
                    ...producto,
                    cantidad: 1
                };
            } else {
                cant[producto.nombre].cantidad++;
            }
            return cant;
    }, {});
    
    // Value para proporcionar al contexto del carrito
    const value = {
        carrito: Object.values(productosAgrupados),
        agregarAlCarrito,
        eliminarDelCarrito,
        confirmarCompra
    };

        // defino la url donde direcciona dsp de completar la compra
    const redireccionar = () => {
        window.location.href = "/";
    }

    return (
        <CarritoContext.Provider value={value}>
        {children}
        {/* aca arranca el primer modal */}
        <div className="modal fade" id="carritoModal" tabIndex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Aca arranca donde se muestra el producto en el carrito */}
                        {Object.values(productosAgrupados).map((producto, index)  => (
                            <div key={index} className="d-flex align-items-center">
                            <img src={producto.imagen} alt={producto.nombre} className="img-thumbnail mr-3" style={{ width: "100px", marginRight: "10px" }} />
                            <div className="flex-grow-1" style={{ marginRight: '10px' }}>
                                <p className="mb-0 texto-negro">{producto.nombre} </p>
                                <p className="mb-0 texto-negro">{producto.precio}</p>
                            </div>
                            {/* botones para agregar o disminuir cantidad de productos del carrito */}
                            <div className="d-flex align-items-center me-2">
                            <button className="btn btn-warning me-2" onClick={() => decrementarCantidad(producto.nombre)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <p className="mb-0">{producto.cantidad}</p>
                            <button className="btn btn-success ms-2" onClick={() => incrementarCantidad(producto)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            </div>
                            {/* elimino producto del carrito*/}
                            <button className="btn btn-danger" onClick={() => eliminarDelCarrito(producto.nombre)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <p className="texto-negro"> Total: ${precioTotal.toLocaleString()}</p>
                    </div>
                    <div className="modal-footer texto-negro">
                        {/* Botones para confirmar/borrar carrito */}
                        <button type="button" className="btn btn-danger" onClick={borrarCarrito} data-bs-dismiss="modal">Borrar Carrito</button>
                        <button type="button" className="btn btn-success" onClick={borrarCarrito} data-bs-target="#confirmacionCompra" data-bs-toggle="modal">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
        {/* aca arranca el segundo modal */}
        <div className="modal fade" id="confirmacionCompra" aria-hidden="true" aria-labelledby="carritoModalLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title texto-negro" id="carritoModalLabel2">Confirmacion</h5>
                    </div>
                    <div className="modal-body">
                    <p className="texto-negro">Su Compra ha sido Completada</p>
                    </div>
                    <div className="modal-footer texto-negro">
                    <button type="button" className="btn btn-success" onClick={redireccionar} data-bs-dismiss="modal">Volver al Inicio</button>
                    </div>
                </div>
            </div>
        </div>

        </CarritoContext.Provider>
    );
}

export default CarritoCompras;



