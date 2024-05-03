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

    // Borro el carrito
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
        <div className="modal fade" id="carritoModal" tabIndex="-1" data-bs-backdrop="false" aria-labelledby="carritoModalLabel" aria-hidden="true">
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
                            {/* botones para agregr o disminuir cantidad de productos del carrito */}
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
                        <button type="button" className="btn btn-danger" onClick={borrarCarrito} data-bs-dismiss="modal" disabled={carrito.length === 0}>Borrar Carrito</button>
                        <button type="button" className="btn btn-success" data-bs-target="#checkoutCompra" data-bs-toggle="modal" disabled={carrito.length === 0}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>



        {/* aca arranca el Segundo modal */}
        <div className="modal fade" id="checkoutCompra" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="carritoModalLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title texto-negro" id="carritoModalLabel2">Checkout</h5>
                    </div>
                    <div className="modal-body">
                    {/* Campo para ingresar nombre y apellido */}
                    <div className="mb-3">
                            <p className="texto-negro">Nombre y Apellido</p>
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre y Apellido" />
                            </div>
                            {/* Campo para ingresar dirección */}
                            <div className="mb-3">
                            <p className="texto-negro">Direccion</p>
                                <input type="text" className="form-control" id="direccion" placeholder="Dirección" />
                            </div>
                            {/* Campo para ingresar código postal */}
                            <div className="mb-3">
                                <p className="texto-negro">Código Postal</p>
                                <input type="text" className="form-control" id="codigoPostal" placeholder="Código Postal" />
                            </div>
                            {/* Campo para ingresar tarjeta */}
                            <div className="mb-3">
                                <p className="texto-negro">Número de Tarjeta</p>
                                <input type="text" className="form-control" id="tarjeta" placeholder="Número de Tarjeta" />
                            </div>
                            {/* Campo para ingresar fecha de vencimiento */}
                            <div className="mb-3">
                                <p className="texto-negro">Fecha de Vencimiento</p>
                                <input type="text" className="form-control" id="fechaVencimiento" placeholder="MM/AA" />
                            </div>
                            {/* Campo para ingresar CCV */}
                            <div className="mb-3">
                                <p className="texto-negro">CCV</p>
                                <input type="text" className="form-control" id="ccv" placeholder="CCV" />
                            </div>
                            <hr className="my-4" />
                            <div className='mb-3'>
                                <p className="texto-negro">Productos</p>
                            </div>    
                    {Object.values(productosAgrupados).map((producto, index)  => (
                            <div className="flex-grow-1" style={{ marginRight: '10px' }}>
                                <p className="mb-0 texto-negro">{producto.nombre}  (X{producto.cantidad})</p>
                                <p className="mb-0 texto-negro">{producto.precio}</p>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <p className="texto-negro"> Total: ${precioTotal.toLocaleString()}</p>
                    </div>
                    <div className="modal-footer texto-negro">
                        {/*boton para el cartel de compra confirmada*/}
                        <button type="button" className="btn btn-success" onClick={borrarCarrito} data-bs-target="#confirmacionCompra" data-bs-toggle="modal" disabled={carrito.length === 0}>Confirmar Compra</button>
                    </div>
                </div>
            </div>
        </div>





        {/* aca arranca el Tercer modal */}
        <div className="modal fade" id="confirmacionCompra" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="carritoModalLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title texto-negro" id="carritoModalLabel2">Confirmacion</h5>
                    </div>
                    <div className="modal-body">
                        <p className="texto-negro">Su Compra ha sido Completada</p>
                    </div>
                    <div className="modal-footer texto-negro">
                        {/*con este boton vuelvo a la pag de inicio despues de comrpar y borro el carrito */}
                        <button type="button" className="btn btn-success" onClick={redireccionar} data-bs-dismiss="modal">Volver al Inicio</button>
                    </div>
                </div>
            </div>
        </div>

        </CarritoContext.Provider>
    );
}

export default CarritoCompras;



